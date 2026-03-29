// CartItem model - defines the database schema for shopping cart items
import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Ensure unique user-product combination
cartItemSchema.index({ userId: 1, productId: 1 }, { unique: true });

export default mongoose.model("CartItem", cartItemSchema);
