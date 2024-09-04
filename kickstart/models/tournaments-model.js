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
  teams: [{ type: Schema.ObjectId, ref: "teams" }],
  matches: [],
  scorers: [],
  stats: {},
  events: [],
  isQuarterFinals: {
    required: true,
    type: Boolean,
  },
  isSemiFinals: {
    required: true,
    type: Boolean,
  },
  isFinals: {
    required: true,
    type: Boolean,
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
});

export const tournamentsModel =
  mongoose.models.tournaments ??
  mongoose.model("tournaments", tournamentsSchema);
