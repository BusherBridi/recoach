import express from "express";
import { fetchPlayerProfile } from "../controllers/playerProfile.controller";

const router = express.Router();

router.post("/player-profile", fetchPlayerProfile);

export default router;