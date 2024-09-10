import mongoose, { Schema } from "mongoose";
import { ObjectId } from "mongodb";

const groupsSchema = new Schema({
  name: {
    required: true,
    type: String,
  },
  tournamentId: {
    required: true,
    type: String,
  },

  teams: [
    //remember to add points section to each team
  ],
  matches: [],
  teamsQPerGroup: {
    type: Number,
  },
});

export const groupsModel =
  mongoose.models.groups ?? mongoose.model("groups", groupsSchema);
