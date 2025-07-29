import express from "express";
import cors from "cors";
import playerRoutes from "./routes/playerProfile.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", playerRoutes);

export default app;