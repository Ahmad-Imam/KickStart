import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      required: true,
      type: String,
    },
    email: {
      required: true,
      type: String,
    },
    image: {
      required: true,
      type: String,
    },
    superAdmin: { type: Boolean },
    admin: [],
    moderator: [],
  },
  {
    versionKey: false,
  }
);

export const userModel =
  mongoose.models.users ?? mongoose.model("users", userSchema);
