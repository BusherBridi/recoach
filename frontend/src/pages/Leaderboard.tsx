import { useEffect, useState } from "react";
import { PlayerTitle } from "../components/PlayerTitle";
import { steamIDs } from "../data/steamIDs";
import { fetchPlayerProfile, fetchTeamStats } from "../api/rematch";
import { Player } from "../models/Player";
import type { Stats } from "../models/Stats";

export default function Leaderboard() {
  const [playersDict, setPlayersDict] = useState<Record<string, Player>>({});

  useEffect(() => {
    async function fetchAll() {
      const dict: Record<string, Player> = {};

      await Promise.all(
        steamIDs.map(async (steamId) => {
          try {
            const data = await fetchPlayerProfile("steam", steamId);
            dict[steamId] = new Player(
              steamId,
              data.player.display_name,
              data.lifetime_stats.All as Stats
            );
          } catch (error) {
            console.error(`Failed fetching ${steamId}`, error);
          }
        })
      );

      setPlayersDict(dict);
    }

    fetchAll();
  }, []);

const sortedPlayers = Object.values(playersDict).sort(
  (a, b) => b.stats.goals - a.stats.goals // Sort by total goals (built in js sort)
);

useEffect(() => {
  async function fetchTeamMatches() {
    const teamMatches = await fetchTeamStats("steam", steamIDs);
    console.log(teamMatches);
  }
  fetchTeamMatches();
}, []);

return (
<div className="flex flex-col items-center mt-10">
  <h1 className="text-3xl font-bold mb-4">Leaderboard</h1>
  <div className="flex flex-col items-center space-y-4">
    {sortedPlayers.map((player, rank) => (
      <PlayerTitle
        key={player.id}
        username={`${rank + 1}. ${player.name}`}
        displayStat="Total Goals"
        statValue={player.stats.goals.toString()}
      />
    ))}
  </div>
</div>
  );
}
