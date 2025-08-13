import React, { useEffect, useState } from "react";
import { fetchTeamStats } from "../api/rematch";
import { steamIDs } from "../data/steamIDs";
import { Card } from "../components/Card";
import { StatLine } from "../components/StatLine";

interface TeamMatch {
  match: {
    timestamp: string;
    playlist: string;
    wins: number;
    losses: number;
  };
  players: string[];
  aggregatedStats: {
    goalkeeper_saves: number;
    goals: number;
    assists: number;
    intercepted_passes: number;
    passes: number;
    shots: number;
    shots_on_target: number;
    tackle_success: number;
    tackles: number;
    mvp_titles: number;
  };
}

export default function TeamMatches() {
  const [matches, setMatches] = useState<TeamMatch[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTeamMatches() {
      try {
        const data = await fetchTeamStats("steam", steamIDs);
        setMatches(data);
        console.log("Team matches:", data);
      } catch (error) {
        console.error("Error fetching team matches:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchTeamMatches();
  }, []);

  if (loading) {
    return <div className="skeleton h-70 w-40"></div>;
  }

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-3xl font-bold mb-4">Team Matches</h1>
      <div className="grid gap-4 w-full max-w-4xl">
        {matches.map((match, index) => (
          <Card key={index}>
            <div className="mb-4">
              <h2 className="text-xl font-semibold">
                {new Date(match.match.timestamp).toLocaleDateString()} - {match.match.playlist}
              </h2>
              <p className="text-sm">
                Result: {match.match.wins} wins - {match.match.losses} losses
              </p>
              <p className="text-sm">
                Players: {match.players.join(", ")}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <StatLine label="Goals">
                {match.aggregatedStats.goals}
              </StatLine>
              <StatLine label="Assists">
                {match.aggregatedStats.assists}
              </StatLine>
              <StatLine label="Saves">
                {match.aggregatedStats.goalkeeper_saves}
              </StatLine>
              <StatLine label="Shots">
                {match.aggregatedStats.shots}
              </StatLine>
              <StatLine label="Shots on Target">
                {match.aggregatedStats.shots_on_target}
              </StatLine>
              <StatLine label="Passes">
                {match.aggregatedStats.passes}
              </StatLine>
              <StatLine label="Interceptions">
                {match.aggregatedStats.intercepted_passes}
              </StatLine>
              <StatLine label="Tackles">
                {match.aggregatedStats.tackles}
              </StatLine>
              <StatLine label="MVPs">
                {match.aggregatedStats.mvp_titles}
              </StatLine>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}