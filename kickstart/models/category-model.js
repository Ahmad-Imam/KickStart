import mongoose, { Schema } from "mongoose";

const categorySchema = new mongoose.Schema({
  id: {
    type: Number,
    required: false,
  },
  label: {
    type: String,
    required: false,
  },
  value: {
    type: String,
    required: false,
  },
  image_url: {
    type: String,
    required: false,
  },
});

export const categoryModel =
  mongoose.models.category ?? mongoose.model("category", categorySchema);
