import mongoose, { Schema } from "mongoose";
import { ObjectId } from "mongodb";

const teamsTournamentSchema = new Schema({
  name: {
    type: String,
  },
  location: {
    type: String,
  },
  bio: {
    type: String,
  },
  groupName: {
    type: String,
  },

  qName: {
    type: String,
  },

  tournamentId: {
    required: true,
    type: ObjectId,
  },
  teamId: {
    required: true,
    type: ObjectId,
  },

  players: [],

  points: {
    type: Number,
  },

  matchPlayed: {
    type: Number,
  },
  matchWon: {
    type: Number,
  },
  matchDraw: {
    type: Number,
  },
  matchLost: {
    type: Number,
  },
  goalsFor: {
    type: Number,
  },
  goalsAgainst: {
    type: Number,
  },
  scorers: [],
  yellow: [],
  red: [],
  motm: [],
});

export const teamsTournamentModel =
  mongoose.models.teamsTournament ??
  mongoose.model("teamsTournament", teamsTournamentSchema);
