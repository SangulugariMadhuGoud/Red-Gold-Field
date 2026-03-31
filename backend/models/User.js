// User model - defines the database schema for user data
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: function () {
      return this.authProvider === "local";
    },
  },
  fullName: {
    type: String,
  },
  phone: {
    type: String,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  refreshToken: {
    type: String,
  },
  googleId: {
    type: String,
    sparse: true,
    unique: true,
  },
  photo: {
    type: String,
  },
  authProvider: {
    type: String,
    enum: ["local", "google"],
    default: "local",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("User", userSchema);
