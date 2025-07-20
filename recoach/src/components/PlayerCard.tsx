import { useEffect, useState } from "react";
import { Card } from "./Card";
import { fetchPlayerProfile } from "../api/rematch";
import type { Stats } from "../models/Stats";
import { StatLabels } from "../models/Stats";
import { StatLine } from "./StatLine";
import { ShotRatioStat } from "./ShotRatioStat";

// Optional: Map stat keys to display labels

export function PlayerCard({ steamId }: { steamId?: string }) {
  const [profile, setProfile] = useState<any | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    if (!steamId) return;
    fetchPlayerProfile("steam", steamId)
      .then((data) => {
        setProfile(data);
        setStats(data.lifetime_stats.All as Stats);
      })
      .catch(console.error);
  }, [steamId]);

  if (!profile || !stats) return <div className="skeleton h-70 w-40"></div>;

  return (
    <Card>
      <h2>Username: {profile.player?.display_name}</h2>
      <div className="grid grid-cols-2 gap-2">
        {Object.entries(stats).map(([key, value]) => (
          <StatLine key={key} label={StatLabels[key as keyof Stats] || key}>
            {key === "shot_ratio" ? (
              <ShotRatioStat value={value as number} />
            ) : (
              value as React.ReactNode
            )}
          </StatLine>
        ))}
      </div>
    </Card>
  );
}
