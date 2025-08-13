import express from "express";
import { fetchTeamProfile } from "../controllers/teamProfile.controller";

const router = express.Router();

router.post("/team-profile", fetchTeamProfile);

export default router;