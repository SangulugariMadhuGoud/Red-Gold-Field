// Contact controller - handles contact form requests
import contactService from "../services/contactService.js";
import validateContact from "../validators/contact.js";
const submitContact = async (req, res) => {
  try {
    const { isValid, errors } = validateContact(req.body);

    if (!isValid) {
      return res.status(400).json({ message: "Validation failed", errors });
    }

    const contact = await contactService.saveContact(req.body);

    let emailWarning = null;

    try {
      await contactService.sendAdminNotificationEmail(req.body);
    } catch (error) {
      console.error("Admin notification email failed:", error.message);
      emailWarning = "Contact saved, but notification email failed";
    }

    if (req.body.email) {
      try {
        await contactService.sendAutoReplyEmail(req.body);
      } catch (error) {
        console.error("Auto-reply email failed:", error.message);
        emailWarning = "Contact saved, but one or more emails failed";
      }
    }

    return res.status(201).json({
      message: "Contact form submitted successfully",
      contact,
      emailWarning,
    });
  } catch (error) {
    console.error("Error submitting contact:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getAllContacts = async (req, res) => {
  try {
    const contacts = await contactService.getAllContacts();
    res.json(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getContactById = async (req, res) => {
  try {
    const contact = await contactService.getContactById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    // Auto mark as read
    if (contact.status === "unread") {
      await contactService.updateContactStatus(req.params.id, "read");
      contact.status = "read";
    }

    res.json(contact);
  } catch (error) {
    console.error("Error fetching contact:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const contact = await contactService.updateContactStatus(
      req.params.id,
      status,
    );
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.json(contact);
  } catch (error) {
    console.error("Error updating contact status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteContact = async (req, res) => {
  try {
    const contact = await contactService.deleteContact(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.json({ message: "Contact deleted successfully" });
  } catch (error) {
    console.error("Error deleting contact:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default {
  submitContact,
  getAllContacts,
  getContactById,
  updateStatus,
  deleteContact,
};
