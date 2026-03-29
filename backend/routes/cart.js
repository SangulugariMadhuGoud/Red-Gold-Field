// Cart routes - defines API endpoints for shopping cart management
import express from "express";
import cartController from "../controllers/cartController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// Get cart items for user
router.get("/", auth, cartController.getCartItems);

// Add item to cart
router.post("/", auth, cartController.addToCart);

// Update cart item
router.put("/:id", auth, cartController.updateCartItem);

// Remove item from cart
router.delete("/:id", auth, cartController.removeFromCart);

export default router;
