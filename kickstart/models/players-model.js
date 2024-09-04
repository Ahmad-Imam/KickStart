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
  jersey: {
    required: true,
    type: Number,
  },
  goals: {
    required: false,
    type: {},
  },
  team: {
    required: false,
    type: ObjectId,
  },
});

export const playersModel =
  mongoose.models.players ?? mongoose.model("players", playerSchema);
