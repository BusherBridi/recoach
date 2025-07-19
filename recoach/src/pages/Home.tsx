import React from "react";
import {steamIDs} from "../data/steamIDs"; // Import the steam IDs from the data file`
import { PlayerCard } from "../components/PlayerCard";
export default function Home() {
  return (
    <div>
      <h1 style={{ display: "flex", justifyContent: "center", fontSize: "3rem" }}>team f.c stats</h1>
      <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
        {steamIDs.map((steamId: string) => (<PlayerCard key={steamId} steamId={steamId} />))}
      </div>
    </div>
  );
}
