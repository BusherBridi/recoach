import { Request, Response } from "express";
import { getTeamMatches } from "../services/rematchAPI.service";

export async function fetchTeamProfile(req: Request, res: Response) {
  try {
    const { platform, platformIds } = req.body; // Accept array of IDs
    const data = await getTeamMatches(platform, platformIds); // Call the correct service
    res.json(data);
  } catch (error) {
    console.error("Controller error:", error);
    res.status(500).json({ error: "Failed to fetch team profile" });
  }
}