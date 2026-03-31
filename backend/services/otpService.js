// OTP service - handles OTP generation, saving, and verification
import crypto from "crypto";
import bcrypt from "bcryptjs";
import OTP from "../models/OTP.js";

const generateOTP = () => {
  const otp = crypto.randomInt(100000, 999999).toString();
  const hashedOTP = bcrypt.hashSync(otp, 10);
  return { plainOTP: otp, hashedOTP };
};

const saveOTP = async (userId, hashedOTP, type) => {
  // Delete any existing unused OTPs for this user of same type
  await OTP.deleteMany({ userId, type, used: false });

  const otpDoc = new OTP({
    userId,
    otp: hashedOTP,
    type,
    expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
  });

  await otpDoc.save();
};

const verifyOTP = async (userId, plainOTP, type) => {
  const otpDoc = await OTP.findOne({
    userId,
    type,
    used: false,
    expiresAt: { $gt: new Date() },
  }).sort({ createdAt: -1 });

  if (!otpDoc) {
    throw new Error("Invalid or expired OTP");
  }

  if (otpDoc.attempts >= 5) {
    throw new Error("Too many attempts");
  }

  otpDoc.attempts += 1;
  await otpDoc.save();

  const isMatch = bcrypt.compareSync(plainOTP, otpDoc.otp);
  if (!isMatch) {
    throw new Error("Invalid OTP");
  }

  otpDoc.used = true;
  await otpDoc.save();

  return true;
};

export default { generateOTP, saveOTP, verifyOTP };
