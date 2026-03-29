// Product model - defines the database schema for product data
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  weight: {
    type: String,
  },
  origin: {
    type: String,
  },
  badge: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  inStock: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Product", productSchema);
