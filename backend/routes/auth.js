// Authentication routes - defines API endpoints for user authentication
import express from "express";
import authController from "../controllers/authController.js";
import { auth, requireRole } from "../middleware/auth.js";
import authValidators from "../validators/authValidators.js";
import rateLimit from "express-rate-limit";
import passport from "../config/passport.js";

const router = express.Router();

// Rate limiter for forgot password
const forgotPasswordLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // limit each IP to 3 requests per windowMs
  message: "Too many requests, please try again later.",
});

// Google OAuth
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  authController.googleCallback,
);

// Register
router.post("/register", authValidators.register, authController.register);

// Login
router.post("/login", authValidators.login, authController.login);

// Refresh token
router.post("/refresh", authController.refresh);

// Logout
router.post("/logout", authController.logout);

// Get current user
router.get("/me", auth, authController.getMe);

// Send OTP
router.post("/send-otp", authValidators.sendOTP, authController.sendOTP);

// Verify OTP (phone)
router.post("/verify-otp", authValidators.verifyOTP, authController.verifyOTP);

// Forgot password
router.post(
  "/forgot-password",
  // forgotPasswordLimiter,
  authValidators.validateForgotPassword,
  authController.forgotPassword,
);

// Verify reset OTP
router.post(
  "/verify-reset-otp",
  authValidators.validateVerifyOTP,
  authController.verifyResetOTP,
);

// Reset password
router.post(
  "/reset-password",
  authValidators.validateResetPassword,
  authController.resetPassword,
);

// Forgot password phone
router.post(
  "/forgot-password-phone",
  forgotPasswordLimiter,
  authValidators.validateForgotPasswordPhone,
  authController.forgotPasswordPhone,
);

// Verify phone OTP
router.post(
  "/verify-phone-otp",
  authValidators.validateVerifyPhoneOTP,
  authController.verifyPhoneOTP,
);

// Admin only route example
router.get(
  "/admin/users",
  auth,
  requireRole("admin"),
  authController.getAllUsers,
);

export default router;
