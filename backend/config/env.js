import dotenv from "dotenv";

dotenv.config();

// 🔥 Fail fast if critical env vars missing
if (!process.env.JWT_SECRET || !process.env.JWT_REFRESH_SECRET) {
  throw new Error("JWT secrets are missing in environment variables");
}

const env = {
  PORT: process.env.PORT || 5000,

  MONGODB_URI:
    process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/rgf",

  JWT_SECRET: process.env.JWT_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,

  JWT_ACCESS_EXPIRE: process.env.JWT_ACCESS_EXPIRE || "15m",
  JWT_REFRESH_EXPIRE: process.env.JWT_REFRESH_EXPIRE || "7d",
};

export default Object.freeze(env);