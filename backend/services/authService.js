import env from "../config/env.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    env.JWT_SECRET,
    { expiresIn: env.JWT_ACCESS_EXPIRE || "15m" }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id },
    env.JWT_REFRESH_SECRET,
    { expiresIn: env.JWT_REFRESH_EXPIRE || "7d" }
  );
};

const authService = {
  register: async ({ email, password, fullName, phone }) => {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const error = new Error("User already exists");
      error.status = 400;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      password: hashedPassword,
      fullName,
      phone,
    });

    await user.save();

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();

    return {
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        email,
        fullName,
        phone,
        role: user.role,
      },
    };
  },

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

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();

    return {
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        phone: user.phone,
        role: user.role,
      },
    };
  },

  refreshToken: async (refreshToken) => {
    if (!refreshToken) {
      const error = new Error("Refresh token required");
      error.status = 401;
      throw error;
    }

    try {
      const decoded = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET);
      const user = await User.findById(decoded.id);

      if (!user || user.refreshToken !== refreshToken) {
        const error = new Error("Invalid refresh token");
        error.status = 401;
        throw error;
      }

      const newAccessToken = generateAccessToken(user);
      const newRefreshToken = generateRefreshToken(user);

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

  sendOTP: async (phone) => {
    console.log(`Sending OTP to ${phone}`);
  },

  verifyOTP: async (phone, otp) => {
    const user = await User.findOne({ phone });
    if (user) {
      user.isVerified = true;
      await user.save();
    }
  },

  generateAccessToken,
  generateRefreshToken,
};

export default authService;