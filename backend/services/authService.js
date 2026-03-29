// Authentication service - contains business logic for user authentication
import env from "../config/env.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";


const authService = {
  // Generate access token
  generateAccessToken: (user) => {
    return jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      env.JWT_SECRET,
      { expiresIn: env.JWT_EXPIRE || "15m" },
    );
  },

  // Generate refresh token
  generateRefreshToken: (user) => {
    return jwt.sign({ userId: user._id }, env.JWT_REFRESH_SECRET, {
      expiresIn: env.JWT_REFRESH_EXPIRE || "7d",
    });
  },

  // Register user
  register: async ({ email, password, fullName, phone }) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error("User already exists");
      error.status = 400;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, fullName, phone });
    await user.save();

    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();

    return {
      accessToken,
      refreshToken,
      user: { id: user._id, email, fullName, phone, role: user.role },
    };
  },

  // Login user
  login: async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("Invalid credentials");
      error.status = 400;
      throw error;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const error = new Error("Invalid credentials");
      error.status = 400;
      throw error;
    }

    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();

    return {
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        email,
        fullName: user.fullName,
        phone: user.phone,
        role: user.role,
      },
    };
  },

  // Refresh token
  refreshToken: async (refreshToken) => {
    if (!refreshToken) {
      const error = new Error("Refresh token required");
      error.status = 401;
      throw error;
    }

    try {
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
      const user = await User.findById(decoded.userId);

      if (!user || user.refreshToken !== refreshToken) {
        const error = new Error("Invalid refresh token");
        error.status = 401;
        throw error;
      }

      const newAccessToken = this.generateAccessToken(user);
      const newRefreshToken = this.generateRefreshToken(user);

      user.refreshToken = newRefreshToken;
      await user.save();

      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      };
    } catch (error) {
      const err = new Error("Invalid refresh token");
      err.status = 401;
      throw err;
    }
  },

  // Send OTP
  sendOTP: async (phone) => {
    // TODO: Implement SMS sending with Twilio or similar
    // For now, just log
    console.log(`Sending OTP to ${phone}`);
  },

  // Verify OTP
  verifyOTP: async (phone, otp) => {
    // TODO: Verify OTP from cache/database
    // For now, just mark as verified
    const user = await User.findOne({ phone });
    if (user) {
      user.isVerified = true;
      await user.save();
    }
  },
};

export default authService;
