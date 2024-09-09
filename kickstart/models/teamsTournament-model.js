import mongoose, { Schema } from "mongoose";
import { ObjectId } from "mongodb";

const teamsTournamentSchema = new Schema({
  name: {
    type: String,
  },
  location: {
    type: String,
  },
  groupName: {
    type: String,
  },
  tournamentId: {
    required: true,
    type: ObjectId,
  },
  matchDate: {
    type: String,
  },
  players: [],
  totalScored: {
    type: Number,
  },
  totalConceded: {
    type: Number,
  },

  scorer: {
    players: [],
  },
  yellow: {
    players: [],
  },
  red: {
    players: [],
  },
});

export const teamsTournamentModel =
  mongoose.models.teamsTournament ??
  mongoose.model("teamsTournament", teamsTournamentSchema);
