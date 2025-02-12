import mongoose from "mongoose";

const tournamentSchema = new mongoose.Schema(
  {
    tournamentName: { type: String, required: true },
    subheading: { type: String , required: true},
    organizer: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    lastDate: { type: Date, required: true },
    location: { type: String, required: true },
    maxTeams: { type: Number, required: true },
    maxPlayers: { type: Number, required: true },
    image: { type: String }, 
  },
  { timestamps: true }
);

export default mongoose.model("Tournament", tournamentSchema);
