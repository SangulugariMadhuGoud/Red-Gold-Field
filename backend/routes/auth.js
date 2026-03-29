// Authentication routes - defines API endpoints for user authentication
import express from "express";
import authController from "../controllers/authController.js";
import { auth, requireRole } from "../middleware/auth.js";
import authValidators from "../validators/authValidators.js";

const router = express.Router();

// Register
router.post("/register", authValidators.register, authController.register);

// Login
router.post("/login", authValidators.login, authController.login);

// Refresh token
router.post("/refresh", authController.refresh);

// Get current user
router.get("/me", auth, authController.getMe);

// Send OTP
router.post("/send-otp", authValidators.sendOTP, authController.sendOTP);

// Verify OTP
router.post("/verify-otp", authValidators.verifyOTP, authController.verifyOTP);

// Admin only route example
router.get(
  "/admin/users",
  auth,
  requireRole("admin"),
  authController.getAllUsers,
);

export default router;
