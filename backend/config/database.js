// config/db.js
import mongoose from "mongoose";
import env from "../config/env.js";

const connectDB = async () => {
  try {
    const mongodbUri =
      env.MONGODB_URI || "mongodb://127.0.0.1:27017/rgf";

    const conn = await mongoose.connect(mongodbUri, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

// 🔥 Correct way to listen to events
mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to DB");
});

mongoose.connection.on("error", (err) => {
  console.error("Mongoose error:", err.message);
});

mongoose.connection.on("disconnected", () => {
  console.warn("Mongoose disconnected");
});

export default connectDB;