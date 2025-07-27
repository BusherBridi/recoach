import { Card } from "./Card";
import type { Stats } from "../models/Stats";
import { StatLabels } from "../models/Stats";
import { StatLine } from "./StatLine";
import { ShotRatioStat } from "./ShotRatioStat";

type PlayerCardProps = {
  profile?: any;
  stats?: Stats;
};

export function PlayerCard({ profile, stats }: PlayerCardProps) {
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
