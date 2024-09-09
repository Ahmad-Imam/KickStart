import mongoose, { Schema } from "mongoose";
import { ObjectId } from "mongodb";

const matchSchema = new Schema({
  type: {
    required: true,
    type: String,
  },
  name: {
    required: false,
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
    required: false,
    type: String,
  },
  location: {
    required: false,
    type: String,
  },
  status: {
    required: true,
    type: String,
  },
  result: {
    required: false,
    goals: {
      team1: Number,
      team2: Number,
    },
  },

  scorer: {
    required: false,
    type: [
      {
        team1: [],
      },
      { team2: [] },
    ],
  },

  yellow: {
    required: false,
    type: [
      {
        team1: [],
      },
      { team2: [] },
    ],
  },

  red: {
    required: false,
    type: [
      {
        team1: [],
      },
      { team2: [] },
    ],
  },
  referee: {
    required: false,
    type: String,
  },
});

export const matchModel =
  mongoose.models.match ?? mongoose.model("match", matchSchema);
