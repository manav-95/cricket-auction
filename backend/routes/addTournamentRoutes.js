import express from "express";
import multer from "multer";
import path from "path";
import { createTournament, getTournaments, deleteTournamentById, getTournamentById } from "../controllers/addTournamentController.js";
import addTournament from '../models/addTournament.js';


const router = express.Router();

// Image Upload Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

router.post("/", upload.single("image"), createTournament);

// GET All Tournaments
router.get("/", getTournaments);


// DELETE Tournaments By ID
router.delete("/:id", deleteTournamentById);


// GET Tournaments By ID
router.get("/:id", getTournamentById);


export default router;