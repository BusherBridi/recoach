import { StatLine } from "./StatLine";

export function PlayerTitle({ username, displayStat, statValue}: { username: string, displayStat: string, statValue: string }) {

  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <h1 className="text-2xl font-bold">
        {username || "Loading..."}
      </h1>
      <div>
        <StatLine label={displayStat}>
          <span className="text-lg font-semibold">
            {statValue || "N/A"}
          </span>
        </StatLine>
      </div>
    </div>
  );
}
