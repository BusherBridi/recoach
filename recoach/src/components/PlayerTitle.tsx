import { useEffect, useState } from "react";
import { fetchPlayerProfile } from "../api/rematch";
import type { Stats } from "../models/Stats";
import { StatLabels } from "../models/Stats";
import { StatLine } from "./StatLine";

export function PlayerTitle({ steamId }: { steamId: string }) {
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

  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <h1 className="text-2xl font-bold">
        {profile?.player?.display_name || "Loading..."}
      </h1>
      <div>
        <StatLine label={"Goal Ratio"}>
          <span className="text-lg font-semibold">
            {stats ? (stats.goals / stats.matches_played).toFixed(2) : "—"}
          </span>
        </StatLine>
      </div>
    </div>
  );
}
