import mongoose, { Schema } from "mongoose";
import { ObjectId } from "mongodb";

const teamsSchema = new Schema({
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
  players: [],
});

export const teamsModel =
  mongoose.models.teams ?? mongoose.model("teams", teamsSchema);
