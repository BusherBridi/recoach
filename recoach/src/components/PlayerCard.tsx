import { useEffect, useState } from "react";
import { Card } from "./Card"; // Import the Card component
import { fetchPlayerProfile } from "../api/rematch";
import type { Stats } from "../models/Stats";
import { StatLine } from "./StatLine";

export function PlayerCard({ steamId }: { steamId?: string }) {
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

  if (!profile || !stats) return <div className="skeleton h-70 w-40"></div>;

  return (
    <Card>
      <h2>Username: {profile.player?.display_name}</h2>
      <div className="grid grid-cols-2 gap-2">
        <StatLine label="Matches Played">
          {stats.matches_played.toString()}
        </StatLine>
        <StatLine label="Wins">
          {stats.wins.toString()}
        </StatLine>
        <StatLine label="MVPs">
          {stats.mvps.toString()}
        </StatLine>
        <StatLine label="Goals">
          {stats.goals.toString()}
        </StatLine>
        <StatLine label="Assists">
          {stats.assists.toString()}
        </StatLine>
        <StatLine label="Shots">
          {stats.shots.toString()}
          </StatLine>
        <StatLine label="Shots on Target">
          {stats.shot_on_target.toString()}
          </StatLine>
        <StatLine label="Tackles">
        {stats.tackles.toString()}
        </StatLine>
        <StatLine label="Tackle Success">
          {`${stats.tackle_success}`}
          </StatLine>
        <StatLine label="Saves">
          {stats.saves.toString()}
          </StatLine>
        <StatLine label="Passes">
          {stats.passes.toString()}
        </StatLine>
        <StatLine label="Shot Ratio">
            <div className="flex justify-center items-end w-full" style={{ minHeight: "6.5rem" }}>
              <div
                className="radial-progress"
                style={{ "--size": "6rem", "--value": stats.shot_ratio * 100 } as React.CSSProperties}
                aria-valuenow={stats.shot_ratio * 100}
                role="progressbar"
              >
                {(stats.shot_ratio * 100).toFixed(0)}%
              </div>
            </div>
        </StatLine>


      </div>
    </Card>
  );
}
