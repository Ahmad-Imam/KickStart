import mongoose, { Schema } from "mongoose";
import { ObjectId } from "mongodb";

const tournamentsSchema = new Schema({
  name: {
    required: true,
    type: String,
  },
  bio: {
    required: true,
    type: String,
  },
  location: {
    required: true,
    type: String,
  },
  startDate: {
    required: true,
    type: String,
  },
  endDate: {
    required: true,
    type: String,
  },
  status: {
    required: true,
    type: String,
  },
  organizer: {
    required: true,
    type: String,
  },
  teamsTournament: [],
  matches: [],
  scorers: [],
  stats: {},
  events: [],
  groupMatch: {
    required: false,
    type: [],
  },
  quarterMatch: {
    required: false,
    type: [],
  },
  semiMatch: {
    required: false,
    type: [],
  },
  isThirdPlace: {
    required: true,
    type: {},
  },
  groupsNum: {
    required: true,
    type: Number,
  },
  teamsPerGroup: {
    required: true,
    type: Number,
  },
  teamsQPerGroup: {
    required: true,
    type: Number,
  },
  admin: {
    required: true,
    type: String,
  },
  moderators: {
    required: false,
    type: [],
  },
});

export const tournamentsModel =
  mongoose.models.tournaments ??
  mongoose.model("tournaments", tournamentsSchema);
