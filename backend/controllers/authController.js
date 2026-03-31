// Authentication controller - handles request/response logic for auth endpoints
import { validationResult } from "express-validator";
import User from "../models/User.js";
import OTP from "../models/OTP.js";
import authService from "../services/authService.js";
import otpService from "../services/otpService.js";
import sendOTPEmail from "../services/emailService.js";
import smsService from "../services/smsService.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import env from "../config/env.js";

const authController = {
  // Register
  register: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, fullName, phone } = req.body;

    try {
      const result = await authService.register({
        email,
        password,
        fullName,
        phone,
      });
      const { accessToken, refreshToken, user } = result;
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 60 * 1000,
      });
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.status(201).json({ user });
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  },

  // Login
  login: async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      const result = await authService.login(email, password);
      const { accessToken, refreshToken, user } = result;
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 60 * 1000,
      });
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.json({ user });
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  },

  // Refresh token
  refresh: async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    try {
      const result = await authService.refreshToken(refreshToken);
      const { accessToken, refreshToken: newRefreshToken } = result;
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 60 * 1000,
      });
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.json({ message: "Tokens refreshed" });
    } catch (error) {
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");
      res.status(error.status || 401).json({ message: error.message });
    }
  },

  // Get current user
  getMe: async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select(
        "-password -refreshToken",
      );
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  },

  // Send OTP
  sendOTP: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { phone } = req.body;

    try {
      await authService.sendOTP(phone);
      res.json({ message: "OTP sent successfully" });
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  },

  // Verify OTP
  verifyOTP: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { phone, otp } = req.body;

    try {
      await authService.verifyOTP(phone, otp);
      res.json({ message: "Phone verified successfully" });
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  },

  // Get all users (admin only)
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find().select("-password -refreshToken");
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  },

  // Forgot password
  forgotPassword: async (req, res) => {
    const { email } = req.body;
    console.log(email);
    try {
      const user = await User.findOne({ email });
      if (user) {
        const { plainOTP, hashedOTP } = otpService.generateOTP();
        await otpService.saveOTP(user._id, hashedOTP, "reset");
        await sendOTPEmail(user.email, plainOTP, "reset"); // if this throws, catch block runs
      } else {
        // To prevent email enumeration, we still return success message even if user not found
        console.warn(
          `Password reset requested for non-existent email: ${email}`,
        );
      }
      res.json({
        // ← only reached if sendOTPEmail succeeded
        message: "If this email is registered you will receive an OTP",
      });
    } catch (error) {
      console.error("forgotPassword error:", error.message);
      res.status(500).json({ message: error.message }); // ← now returns 500 properly
    }
  },

  // Verify reset OTP
  verifyResetOTP: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, otp } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      await otpService.verifyOTP(user._id, otp, "reset");

      const resetToken = jwt.sign({ id: user._id }, env.JWT_SECRET, {
        expiresIn: "15m",
      });
      res.cookie("resetToken", resetToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 60 * 1000,
      });
      res.json({ message: "OTP verified" });
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  },

  // Reset password
  resetPassword: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { newPassword } = req.body; // ← only newPassword needed
    const resetToken = req.cookies.resetToken;

    try {
      if (!resetToken) {
        return res
          .status(401)
          .json({ message: "Reset token missing or expired" });
      }

      const decoded = jwt.verify(resetToken, env.JWT_SECRET);
      const user = await User.findById(decoded.id);

      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      // ← no OTP verification here, already done in verifyResetOTP
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();

      await OTP.deleteMany({ userId: user._id });
      res.clearCookie("resetToken");
      res.json({ message: "Password reset successfully" });
    } catch (error) {
      console.error("resetPassword error:", error.message);
      res.status(500).json({ message: "Server error" });
    }
  },

  // Logout
  logout: async (req, res) => {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.json({ message: "Logged out" });
  },

  // Google callback
  googleCallback: async (req, res) => {
    try {
      const user = req.user;
      const accessToken = authService.generateAccessToken(user);
      const refreshToken = authService.generateRefreshToken(user);

      user.refreshToken = refreshToken;
      await user.save();

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 60 * 1000,
      });
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.redirect(process.env.FRONTEND_URL + "/dashboard");
    } catch (error) {
      res.status(500).json({ message: "Authentication failed" });
    }
  },

  // Forgot password phone
  forgotPasswordPhone: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { phone } = req.body;

    try {
      const user = await User.findOne({ phone });
      if (user) {
        const { plainOTP, hashedOTP } = otpService.generateOTP();
        await otpService.saveOTP(user._id, hashedOTP, "reset");
        await smsService.sendOTPSMS(phone, plainOTP);
      }
      res.json({
        message: "If this phone is registered you will receive an OTP",
      });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  },

  // Verify phone OTP
  verifyPhoneOTP: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { phone, otp } = req.body;

    try {
      const user = await User.findOne({ phone });
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      await otpService.verifyOTP(user._id, otp, "reset");

      const resetToken = jwt.sign({ id: user._id }, env.JWT_SECRET, {
        expiresIn: "15m",
      });
      res.cookie("resetToken", resetToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 60 * 1000,
      });
      res.json({ message: "OTP verified" });
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  },
};

export default authController;
