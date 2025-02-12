import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import path from "path";

import addTournamentRoutes from "./routes/addTournamentRoutes.js"

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

// Connect DB
connectDB();

// Routes
app.use("/api/addtournament", addTournamentRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));
