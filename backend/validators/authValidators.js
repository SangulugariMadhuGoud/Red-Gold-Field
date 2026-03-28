// Validation rules for authentication endpoints
const { body } = require("express-validator");

const authValidators = {
  register: [
    body("email").isEmail().normalizeEmail(),
    body("password").isLength({ min: 6 }),
    body("fullName").trim().isLength({ min: 1 }),
  ],

  login: [body("email").isEmail().normalizeEmail(), body("password").exists()],

  sendOTP: [body("phone").isMobilePhone()],

  verifyOTP: [
    body("phone").isMobilePhone(),
    body("otp").isLength({ min: 6, max: 6 }),
  ],
};

module.exports = authValidators;
