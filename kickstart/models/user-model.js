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
    password: {
      required: false,
      type: String,
    },
    image: {
      required: false,
      type: String,
    },
    number: {
      required: false,
      type: String,
    },
    shipAddress: {
      required: false,
      type: {},
    },
    billAddress: {
      required: false,
      type: {},
    },
    wishlist: {
      required: false,
      type: Array, // Array of product IDs
    },
    cart: {
      required: false,
      type: [
        {
          product: String, // Product ID
          quantity: Number, // Quantity of the product
        },
      ],
    },
  },
  {
    versionKey: false,
  }
);

export const userModel =
  mongoose.models.users ?? mongoose.model("users", userSchema);
