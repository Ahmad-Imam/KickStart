import mongoose, { Schema } from "mongoose";
import { ObjectId } from "mongodb";

const playerSchema = new Schema({
  name: {
    required: true,
    type: String,
  },
  nickName: {
    required: false,
    type: String,
  },
  country: {
    required: true,
    type: String,
  },
  position: {
    required: true,
    type: String,
  },
  jersey: {
    required: true,
    type: Number,
  },
  goals: {
    required: false,
    type: {},
  },
  tournament: { type: Schema.ObjectId, ref: "tournaments", required: false },
  team: { type: Schema.ObjectId, ref: "teams", required: false },
});

export const playersModel =
  mongoose.models.players ?? mongoose.model("players", playerSchema);
