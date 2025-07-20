// src/models/Stats.ts
export interface Stats {
  matches_played: number;
  wins: number;
  goals: number;
  assists: number;
  shots: number;
  saves: number;
  intercepted_passes: number;
  tackles: number;
  tackle_success: number;
  passes: number;
  shot_on_target: number;
  mvps: number;
  shot_ratio: number;
}

export const StatLabels: Record<keyof Stats, string> = {
  matches_played: "Matches Played",
  wins: "Wins",
  mvps: "MVPs",
  goals: "Goals",
  assists: "Assists",
  shots: "Shots",
  shot_on_target: "Shots on Target",
  tackles: "Tackles",
  tackle_success: "Tackle Success",
  saves: "Saves",
  passes: "Passes",
  intercepted_passes: "Intercepted Passes",
  shot_ratio: "Shot Ratio",
  // Add any other keys from Stats here
};
