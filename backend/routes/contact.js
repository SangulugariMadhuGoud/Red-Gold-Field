// Public contact routes
import express from "express";
import contactController from "../controllers/contactController.js";

const router = express.Router();

// POST /api/public/contact - submit contact form
router.post("/", contactController.submitContact);

export default router;
