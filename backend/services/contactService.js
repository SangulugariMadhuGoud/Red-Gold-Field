// Contact service - handles contact form operations
import Contact from "../models/Contact.js";
import transporter from "../utils/emailTransporter.js";

const saveContact = async (data) => {
  const contact = new Contact(data);
  return await contact.save();
};

const getAllContacts = async () => {
  return await Contact.find().sort({ createdAt: -1 });
};

const getContactById = async (id) => {
  return await Contact.findById(id);
};

const updateContactStatus = async (id, status) => {
  return await Contact.findByIdAndUpdate(id, { status }, { new: true });
};

const deleteContact = async (id) => {
  return await Contact.findByIdAndDelete(id);
};

const sendAdminNotificationEmail = async (data) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: `New Contact Form Submission — ${data.name}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>Message:</strong> ${data.message || "No message provided"}</p>
      <p><strong>Submitted at:</strong> ${new Date().toLocaleString()}</p>
    `,
  };
  await transporter.sendMail(mailOptions);
};

const sendAutoReplyEmail = async (data) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: data.email,
    subject: "We received your message — Red Gold Fields",
    html: `
      <h2>Thank you for contacting us!</h2>
      <p>Dear ${data.name},</p>
      <p>We have received your message and will get back to you within 24 hours.</p>
      <p><strong>Your message:</strong></p>
      <p>${data.message || "No message provided"}</p>
      <p>Best regards,<br>Red Gold Fields Team</p>
    `,
  };
  await transporter.sendMail(mailOptions);
};

export default {
  saveContact,
  getAllContacts,
  getContactById,
  updateContactStatus,
  deleteContact,
  sendAdminNotificationEmail,
  sendAutoReplyEmail,
};
