import addTournament from '../models/addTournament.js';

export const createTournament = async (req, res) => {
    try {
        const { tournamentName, subheading, organizer, startDate, endDate, lastDate, location, maxTeams, maxPlayers } = req.body;
        const newTournament = new addTournament({
            tournamentName,
            subheading,
            organizer,
            startDate,
            endDate,
            lastDate,
            location,
            maxTeams,
            maxPlayers,
            image: req.file ? req.file.path : "",
        });

        await newTournament.save();
        res.status(201).json({ message: "Tournament Uploaded Sucessfully!", newTournament });
    } catch (error) {
        res.status(500).json({ message: "Error Creating Tournament", error: error.message });
    }
};

export const getTournaments = async (req, res) => {
    try {
        const tournaments = await addTournament.find();
        res.status(200).json(tournaments);
    } catch (error) {
        res.status(500).json({ message: "Error fetching tournaments", error: error.message });
    }
};

export const deleteTournamentById = async (req, res) => {
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
}

export const getTournamentById = async (req, res) => {
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
}