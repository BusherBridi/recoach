export async function getPlayerProfile(platform: string, platformId: string) {
  const response = await fetch("https://api.rematchtracker.com/scrap/profile", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ platform, platformId })
  });

  if (!response.ok) {
    throw new Error(`Rematch API error: ${response.status}`);
  }

  return response.json();
}

// YOU GOTTA WRITE THIS ONE OUT DONT USE 
export async function getTeamProfile(platform: string, platformId: string) {
  const response = await fetch("https://api.rematchtracker.com/scrap/profile", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ platform, platformId })
  });

  if (!response.ok) {
    throw new Error(`Rematch API error: ${response.status}`);
  }

  return response.json();
}

export async function getTeamMatches(platform: string, platformIds: string[]) {
  console.log("getTeamMatches called with:", { platform, platformIds });

  // Fetch profiles for all platformIds
  const profiles = await Promise.all(
    platformIds.map(async (platformId) => {
      console.log(`Fetching profile for platformId: ${platformId}`);
      const response = await fetch("https://api.rematchtracker.com/scrap/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ platform, platformId })
      });
      if (!response.ok) {
        console.error(`Rematch API error for ${platformId}: ${response.status}`);
        throw new Error(`Rematch API error: ${response.status}`);
      }
      const data = await response.json();
      console.log(`Profile fetched for ${platformId}:`, data.match_history?.items?.length ?? 0, "matches");
      return { platformId, match_history: data.match_history?.items || [] };
    })
  );

  // Build a map: key = unique match signature, value = array of playerIds and their matches
  const matchMap: Record<string, { match: any, players: string[], matches: any[] }> = {};

  const TIME_WINDOW = 10 * 60 * 1000; // 10 minutes in milliseconds

  profiles.forEach(({ platformId, match_history }) => {
    match_history.forEach((match: any) => {
      const matchTime = new Date(match.timestamp).getTime();

      // Check if an existing match in matchMap is within TIME_WINDOW
      let existingMatchKey: string | null = null;
      for (const key in matchMap) {
        const group = matchMap[key];
        const existingTime = new Date(group.match.timestamp).getTime();

        if (
          Math.abs(existingTime - matchTime) <= TIME_WINDOW &&
          group.match.playlist === match.playlist &&
          group.match.wins === match.wins &&
          group.match.losses === match.losses
        ) {
          existingMatchKey = key;
          break;
        }
      }

      // Use existing key if found, otherwise create a new key
      const key = existingMatchKey || [
        match.timestamp,
        match.playlist,
        match.wins,
        match.losses
      ].join("|");

      if (!matchMap[key]) {
        matchMap[key] = { match, players: [], matches: [] };
      }
      matchMap[key].players.push(platformId);
      matchMap[key].matches.push(match);
    });
  });

  // Filter to only matches played by more than one player (i.e., as a team)
  const teamMatches = Object.values(matchMap).filter(group => group.players.length > 1);

  // Aggregate stats for each team match
  teamMatches.forEach((group, idx) => {
    // List of stat fields to aggregate
    const statFields = [
      "goalkeeper_saves",
      "goals",
      "assists",
      "intercepted_passes",
      "losses",
      "match_count",
      "mvp_titles",
      "passes",
      "shots",
      "shots_on_target",
      "tackle_success",
      "tackles",
      "wins"
      // Add more fields as needed
    ];

    const aggregatedStats: Record<string, number> = {};
    statFields.forEach(field => {
      aggregatedStats[field] = group.matches.reduce((sum, match) => {
        return sum + (typeof match[field] === "number" ? match[field] : 0);
      }, 0);
    });

    group.aggregatedStats = aggregatedStats;

    console.log(`Team match #${idx + 1}:`, {
      players: group.players,
      match: group.match,
      aggregatedStats
    });
  });

  console.log("Total team matches found:", teamMatches.length);

  return teamMatches;
}