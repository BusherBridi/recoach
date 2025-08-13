import express from "express";
import cors from "cors";
import playerRoutes from "./routes/playerProfile.routes";
import teamRoutes from "./routes/teamProfile.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", playerRoutes);
app.use("/api", teamRoutes);

export default app;