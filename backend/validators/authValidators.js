// Validation rules for authentication endpoints
import { body } from "express-validator";

const authValidators = {
  register: [
    body("email").isEmail().normalizeEmail(),
    body("password").isLength({ min: 6 }),
    body("fullName").trim().isLength({ min: 1 }),
  ],

  login: [body("email").isEmail().normalizeEmail({ gmail_remove_dots: false }), body("password").exists()],

  sendOTP: [body("phone").isMobilePhone()],

  verifyOTP: [
    body("phone").isMobilePhone(),
    body("otp").isLength({ min: 6, max: 6 }),
  ],

  validateForgotPassword: [
    body("email").isEmail().normalizeEmail({ gmail_remove_dots: false }),
  ],

  validateVerifyOTP: [
    body("email").isEmail().normalizeEmail({ gmail_remove_dots: false }),
    body("otp").isLength({ min: 6, max: 6 }),
  ],

  // ✅ Only validate newPassword
  validateResetPassword: [
    body("newPassword").isLength({ min: 8 }),
  ],

  validateForgotPasswordPhone: [body("phone").isMobilePhone()],

  validateVerifyPhoneOTP: [
    body("phone").isMobilePhone(),
    body("otp").isLength({ min: 6, max: 6 }),
  ],
};

export default authValidators;
