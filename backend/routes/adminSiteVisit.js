// Admin site visit routes
import express from "express";
import siteVisitController from "../controllers/siteVisitController.js";

const router = express.Router();

// GET /api/admin/site-visits - get all site visits
router.get("/", siteVisitController.getAllSiteVisits);

// GET /api/admin/site-visits/:id - get site visit by id
router.get("/:id", siteVisitController.getSiteVisitById);

// PUT /api/admin/site-visits/:id/status - update site visit status
router.put("/:id/status", siteVisitController.updateStatus);

// DELETE /api/admin/site-visits/:id - delete site visit
router.delete("/:id", siteVisitController.deleteSiteVisit);

export default router;
