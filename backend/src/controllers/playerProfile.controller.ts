import { Request, Response } from "express";
import { getPlayerProfile } from "../services/rematchAPI.service";

export async function fetchPlayerProfile(req: Request, res: Response) {
  try {
    const { platform, platformId } = req.body;
    const data = await getPlayerProfile(platform, platformId);
    res.json(data);
  } catch (error) {
    console.error("Controller error:", error);
    res.status(500).json({ error: "Failed to fetch player profile" });
  }
}