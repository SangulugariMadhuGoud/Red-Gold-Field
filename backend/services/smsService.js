// SMS service - handles sending OTP via SMS
import twilio from "twilio";

const sendOTPSMS = async (phone, otp) => {
  if (!process.env.TWILIO_ACCOUNT_SID) {
    console.log("SMS service not configured");
    return;
  }

  const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN,
  );

  await client.messages.create({
    body: `Your verification code is: ${otp}. Expires in 10 minutes.`,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: phone,
  });
};

export default { sendOTPSMS };
