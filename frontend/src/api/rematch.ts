const API_URL = "http://3.101.17.116/api/player-profile";

export async function fetchPlayerProfile(platform: string, platformId: string) {
  try {
    const response = await fetch(API_URL, {
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
