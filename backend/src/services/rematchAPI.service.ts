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

  // Build a map: key = unique match signature, value = array of playerIds
  const matchMap: Record<string, { match: any, players: string[] }> = {};

  profiles.forEach(({ platformId, match_history }) => {
    console.log(`Processing match history for ${platformId}, matches:`, match_history.length);
    match_history.items.forEach((match: any) => {
      // Create a signature for the match
      const key = [
        match.timestamp,
        match.match_count,
        match.playlist,
        match.wins,
        match.losses
      ].join("|");

      if (!matchMap[key]) {
        matchMap[key] = { match, players: [] };
      }
      matchMap[key].players.push(platformId);
    });
  });

  // Filter to only matches played by more than one player (i.e., as a team)
  // const teamMatches = Object.values(matchMap).filter(group => group.players.length > 1);

  // console.log("Total team matches found:", teamMatches.length);
  // teamMatches.forEach((group, idx) => {
  //   console.log(`Team match #${idx + 1}:`, {
  //     players: group.players,
  //     match: group.match
  //   });
  // });
  const teamMatches = matchMap
  return teamMatches;
}