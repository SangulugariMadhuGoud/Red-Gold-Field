// Email service - handles sending OTP emails
import sendEmail from "../utils/emailService.js";

const sendOTPEmail = async (email, otp, type) => {
  let subject, html;

  if (type === "reset") {
    subject = "Reset your password — Red Gold Field";
    html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Password Reset Request</h2>
        <p>We received a request to reset your password for your Red Gold Field account.</p>
        <p>Your verification code is:</p>
        <div style="font-size: 24px; font-weight: bold; color: #d4af37; text-align: center; margin: 20px 0;">
          ${otp}
        </div>
        <p>This code will expire in 10 minutes.</p>
        <p>If you didn't request this password reset, please ignore this email.</p>
        <p>Best regards,<br>Red Gold Field Team</p>
      </div>
    `;
  } else {
    // For verify type
    subject = "Verify your email — Red Gold Field";
    html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Email Verification</h2>
        <p>Please verify your email address for your Red Gold Field account.</p>
        <p>Your verification code is:</p>
        <div style="font-size: 24px; font-weight: bold; color: #d4af37; text-align: center; margin: 20px 0;">
          ${otp}
        </div>
        <p>This code will expire in 10 minutes.</p>
        <p>Best regards,<br>Red Gold Field Team</p>
      </div>
    `;
  }

  await sendEmail({
    to: email,
    subject,
    html,
  });
};

export default sendOTPEmail;
