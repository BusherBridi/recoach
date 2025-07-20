import React from "react";
import { Link } from "react-router-dom";
import { steamIDs } from "../data/steamIDs"; // Import the steam IDs from the data file`
import { PlayerCard } from "../components/PlayerCard";
export default function Home() {
  return (
    <>
      <div>
        <h1 style={{ display: "flex", justifyContent: "center", fontSize: "3rem" }}>team f.c stats</h1>
        <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
          {steamIDs.map((steamId: string) => (<PlayerCard key={steamId} steamId={steamId} />))}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <Link to="/leaderboard">
          <button className="btn btn-primary">
            Leaderboard
          </button>
        </Link>
      </div>
    </>
  );
}
