// Public site visit routes
import express from "express";
import siteVisitController from "../controllers/siteVisitController";

const router = express.Router();

// POST /api/public/site-visit - submit site visit form
router.post("/", siteVisitController.submitSiteVisit);

export default router;
