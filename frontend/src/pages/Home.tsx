// src/pages/Home.tsx
import { useEffect, useState } from "react";
import { fetchPlayerProfile } from "../api/rematch";
import { Link } from "react-router-dom";
import { steamIDs } from "../data/steamIDs";
import { PlayerCard } from "../components/PlayerCard";
import { Player } from "../models/Player";
import type { Stats } from "../models/Stats";

export default function Home() {
  // Store players by id
  const [playersDict, setPlayersDict] = useState<Record<string, Player>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchAll() {
      const dict: Record<string, Player> = {};

      await Promise.all(
        steamIDs.map(async (steamId) => {
          try {
            const data = await fetchPlayerProfile("steam", steamId);
            console.log("Fetched data for", steamId, data);
            dict[steamId] = new Player(
              steamId,
              data.player.display_name,
              data.lifetime_stats.All as Stats
            );
          } catch (error) {
            console.error(`Failed fetching ${steamId}`, error);
            return(
              <div>Failure</div>
            )
          }
        })
      );

      setPlayersDict(dict);
      setIsLoading(false);
    }

    fetchAll();
  }, []);

  return (
    <>
      <div>
        <h1
        // Make this into a component later
          style={{ display: "flex", justifyContent: "center", fontSize: "3rem" }}  
        >
          LOS DIABLOS F.C
        </h1>
        <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
          {isLoading ? (
            <div className="skeleton h-70 w-40"></div>
          ) : (
            <div className="grid grid-cols-5 gap-4">
              {steamIDs.map((id) => {
                const player = playersDict[id];
                return (
                  <PlayerCard
                    key={id}
                    profile={{ player: { display_name: player.name } }}
                    stats={player.stats}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        <Link to="/leaderboard">
          <button className="btn btn-primary">Leaderboard</button>
        </Link>
      </div>
    </>
  );
}
