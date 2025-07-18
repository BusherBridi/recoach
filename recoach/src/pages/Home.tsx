import React from "react";
import { PlayerCard } from "../components/PlayerCard";
export default function Home() {
  return (
    <div>
      <h1>team f.c stats</h1>
      <div style={{ display: "flex", gap: "16px" }}>
        <PlayerCard steamId="76561199003116359" />
        <PlayerCard steamId="76561198070061111" />
        <PlayerCard steamId="76561198203187736" />
        <PlayerCard steamId="76561197996837798" />
        <PlayerCard steamId="76561198247712772" />
      </div>
      {/* You can add more components or content here */}
      {/* TODO: Convert to loop, put these ids in file or something */}
    </div>
  );
}
