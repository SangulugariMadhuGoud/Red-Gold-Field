// utils/emailService.js — Resend email service for sending all transactional emails
import { Resend } from "resend";
import env from "../config/env.js";

const resend = new Resend(env.RESEND_API_KEY);

export const sendEmail = async ({ to, subject, html }) => {

  // console.log("Resend API Key:", env.RESEND_API_KEY ? "Found ✅" : "Missing ❌")
  // console.log("Sending email to:", to)
  // console.log("From:", env.EMAIL_FROM)

  const { data, error } = await resend.emails.send({
    from: env.EMAIL_FROM,
    to,
    subject,
    html,
  });

  // console.log("Resend response data:", data)
  // console.log("Resend response error:", error)

  if (error) {
    console.error("Resend email error:", error);
    throw new Error(error.message);
  }
  return data;
};

export default sendEmail;
