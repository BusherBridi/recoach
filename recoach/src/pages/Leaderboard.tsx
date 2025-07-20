import React from "react";
import { PlayerTitle } from "../components/PlayerTitle";
import { steamIDs } from "../data/steamIDs";

export default function Leaderboard() {
  console.log("steamIDs:", steamIDs); // Log the steamIDs array

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-3xl font-bold mb-4">Leaderboard</h1>
      <div>
        {steamIDs.map((steamId: string) => {
          console.log("Rendering PlayerTitle for:", steamId); // Log each steamId
          return <PlayerTitle key={steamId} steamId={steamId} />;
        })}
      </div>
    </div>
  );
}
