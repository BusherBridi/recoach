import { useEffect, useState } from "react";
import { fetchPlayerProfile } from "../api/rematch";
import type { Stats } from "../models/Stats";

export function PlayerCard({steamId}: {steamId?: string}) {
  const [profile, setProfile] = useState<any | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    if (!steamId) return; // Do not fetch if steamId is undefined
    fetchPlayerProfile("steam", steamId)
      .then(data => {
        setProfile(data);
        setStats(data.lifetime_stats.All as Stats); // Safely cast to Stats type
      })
      .catch(console.error);
  }, [steamId]);

  if (!profile || !stats) return <div>Loading...</div>;

  return (
    <div>
      <h2>Username: {profile.player?.display_name}</h2>
      <ul>
        <li>Matches Played: {stats.matches_played}</li>
        <li>Wins: {stats.wins}</li>
        <li>Goals: {stats.goals}</li>
        <li>Assists: {stats.assists}</li>
        <li>Shots: {stats.shots}</li>
        <li>Tackles: {stats.tackles}</li>
        <li>Passes: {stats.passes}</li>
        <li>Shot Ratio: {stats.shot_ratio}</li>
      </ul>
    </div>
  );
}
