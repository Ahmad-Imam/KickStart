import mongoose, { Schema } from "mongoose";
import { ObjectId } from "mongodb";

const matchSchema = new Schema({
  type: {
    required: true,
    type: String,
  },
  name: {
    type: String,
  },
  team1: {},
  team2: {},
  qName: {},
  groupName: {
    type: String,
  },
  tournamentId: {
    required: true,
    type: String,
  },
  matchDate: {
    type: String,
  },
  location: {
    type: String,
  },
  status: {
    required: true,
    type: String,
  },
  result: {},

  scorer: {},

  yellow: {},

  red: {},
  referee: {
    type: String,
  },
});

export const matchModel =
  mongoose.models.match ?? mongoose.model("match", matchSchema);
