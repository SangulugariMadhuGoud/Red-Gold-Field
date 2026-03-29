// Admin contact routes
import express from "express";
import contactController from "../controllers/contactController.js";

const router = express.Router();

// GET /api/admin/contacts - get all contacts
router.get("/", contactController.getAllContacts);

// GET /api/admin/contacts/:id - get contact by id
router.get("/:id", contactController.getContactById);

// PUT /api/admin/contacts/:id/status - update contact status
router.put("/:id/status", contactController.updateStatus);

// DELETE /api/admin/contacts/:id - delete contact
router.delete("/:id", contactController.deleteContact);

export default router;
