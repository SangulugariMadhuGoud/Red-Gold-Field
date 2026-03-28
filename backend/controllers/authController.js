// Authentication controller - handles request/response logic for auth endpoints
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const User = require("../models/User");
const authService = require("../services/authService");

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
      res.status(201).json(result);
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
      res.json(result);
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  },

  // Refresh token
  refresh: async (req, res) => {
    const { refreshToken } = req.body;

    try {
      const result = await authService.refreshToken(refreshToken);
      res.json(result);
    } catch (error) {
      res.status(error.status || 401).json({ message: error.message });
    }
  },

  // Get current user
  getMe: async (req, res) => {
    try {
      const user = await User.findById(req.user.userId).select(
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
};

module.exports = authController;
