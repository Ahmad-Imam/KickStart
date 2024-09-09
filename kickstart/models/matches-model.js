import mongoose, { Schema } from "mongoose";
import { ObjectId } from "mongodb";

const matchSchema = new Schema({
  type: {
    required: true,
    type: String,
  },
  team1: {
    required: false,
    type: String,
  },
  team2: {
    required: false,
    type: String,
  },
  qName: {
    team1: String,
    team2: String,
  },
  groupName: {
    required: false,
    type: String,
  },
  tournamentId: {
    required: true,
    type: ObjectId,
  },
  matchDate: {
    required: true,
    type: String,
  },
  location: {
    required: true,
    type: String,
  },
});

export const matchModel =
  mongoose.models.match ?? mongoose.model("match", matchSchema);
