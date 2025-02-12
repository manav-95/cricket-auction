import express from "express";
import multer from "multer";
import path from "path";
import { createTournament, getTournaments } from "../controllers/addTournamentController.js";
import addTournament from '../models/addTournament.js';


const router = express.Router();

// Image Upload Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

router.post("/", upload.single("image"), createTournament);
router.get("/", getTournaments);

// DELETE Tournament
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTournament = await addTournament.findByIdAndDelete(id);

        if (!deletedTournament) {
            return res.status(404).json({ message: "Tournament not found" });
        }

        res.json({ message: "Tournament deleted successfully" });
    } catch (error) {
        console.error("Error deleting tournament:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// get tournament by id
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const tournament = await addTournament.findById(id);

        if (!tournament) {
            return res.status(404).json({ message: "Tournament not found" });
        }

        res.json(tournament);
    } catch (error) {
        console.error("Error fetching tournament:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});




export default router;