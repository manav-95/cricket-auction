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