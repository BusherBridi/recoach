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