// Site visit service - handles site visit form operations
import SiteVisit from "../models/SiteVisit.js";
import sendEmail from "../utils/emailService.js";

const saveSiteVisit = async (data) => {
  const siteVisit = new SiteVisit(data);
  return await siteVisit.save();
};

const getAllSiteVisits = async () => {
  return await SiteVisit.find().sort({ createdAt: -1 });
};

const getSiteVisitById = async (id) => {
  return await SiteVisit.findById(id);
};

const updateSiteVisitStatus = async (id, status) => {
  return await SiteVisit.findByIdAndUpdate(id, { status }, { new: true });
};

const deleteSiteVisit = async (id) => {
  return await SiteVisit.findByIdAndDelete(id);
};

const sendAdminSiteVisitEmail = async (data) => {
  await sendEmail({
    to: process.env.ADMIN_EMAIL,
    subject: `New Site Visit Request — ${data.name} — ${data.project}`,
    html: `
      <h2>New Site Visit Request</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>Email:</strong> ${data.email || "Not provided"}</p>
      <p><strong>Project:</strong> ${data.project}</p>
      <p><strong>Preferred Date:</strong> ${data.date ? new Date(data.date).toLocaleDateString() : "Not specified"}</p>
      <p><strong>Notes:</strong> ${data.message || "No notes provided"}</p>
      <p><strong>Submitted at:</strong> ${new Date().toLocaleString()}</p>
    `,
  });
};

const sendVisitConfirmationEmail = async (data) => {
  await sendEmail({
    to: data.email,
    subject: "Your Site Visit Request — Red Gold Fields",
    html: `
      <h2>Thank you for your interest!</h2>
      <p>Dear ${data.name},</p>
      <p>We have received your site visit request for ${data.project}. Our team will call you within 24 hours to confirm a suitable date.</p>
      <p>Best regards,<br>Red Gold Fields Team</p>
    `,
  });
};

export default {
  saveSiteVisit,
  getAllSiteVisits,
  getSiteVisitById,
  updateSiteVisitStatus,
  deleteSiteVisit,
  sendAdminSiteVisitEmail,
  sendVisitConfirmationEmail,
};
