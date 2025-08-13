const API_URL = "http://3.101.17.116/api/";

export async function fetchPlayerProfile(
  platform: string,
  platformId: string
) {
  const url = `${API_URL}player-profile`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ platform, platformId })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Failed to fetch player profile:", error);
    throw error;
  }
}

// Add: fetchTeamStats function
export async function fetchTeamStats(
  platform: string,
  platformIds: string[]
) {
  const url = `${API_URL}team-profile`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ platform, platformIds })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Failed to fetch team stats:", error);
    throw error;
  }
}
