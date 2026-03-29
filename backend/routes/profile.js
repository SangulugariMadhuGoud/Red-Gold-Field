// Profile routes - defines API endpoints for user profile management
import express from "express";
import profileController from "../controllers/profileController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// Get user profile
router.get("/", auth, profileController.getUserProfile);

// Update user profile
router.put("/", auth, profileController.updateUserProfile);

// Get shipping addresses
router.get("/addresses", auth, profileController.getShippingAddresses);

// Add shipping address
router.post("/addresses", auth, profileController.addShippingAddress);

// Update shipping address
router.put("/addresses/:id", auth, profileController.updateShippingAddress);

// Delete shipping address
router.delete("/addresses/:id", auth, profileController.deleteShippingAddress);

export default router;
