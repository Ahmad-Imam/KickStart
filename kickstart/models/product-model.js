import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
  name: {
    required: true,
    type: String,
  },
  summary: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
  price: {
    required: true,
    type: Number,
  },
  discountPercentage: {
    required: false,
    type: Number,
  },
  stock: {
    required: false,
    type: Number,
  },
  trending: {
    required: true,
    type: Boolean,
  },
  new_arrival: {
    required: true,
    type: Boolean,
  },
  category: {
    required: false,
    type: String,
  },
  size: {
    required: true,
    type: String,
  },
  sku: {
    required: false,
    type: String,
  },
  tags: {
    required: false,
    type: Array,
  },
  reviewCount: {
    required: false,
    type: Number,
  },
  thumbnail: {
    required: false,
    type: String,
  },
  images: {
    required: false,
    type: Array,
  },
  brand: {
    required: false,
    type: String,
  },
});

export const productModel =
  mongoose.models.products ?? mongoose.model("products", productSchema);
