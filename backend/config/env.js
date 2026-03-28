import { configDotenv } from "dotenv";

// Load environment variables from .env file
configDotenv();

module.exports = {
  PORT: process.env.PORT || 5002,
  MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017/rgf",
  JWT_SECRET: process.env.JWT_SECRET || "your-super-secret-jwt-key-change-this-in-production",
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "your-super-secret-refresh-jwt-key-change-this-in-production",
  JWT_EXPIRE: process.env.JWT_EXPIRE || "15m",
  JWT_REFRESH_EXPIRE: process.env.JWT_REFRESH_EXPIRE || "7d",
};     