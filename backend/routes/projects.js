// Project routes - defines API endpoints for project management
import express from "express";
import projectController from "../controllers/projectController.js";

const router = express.Router();

// Get all projects
router.get("/", projectController.getAllProjects);

// Get project by slug
router.get("/:slug", projectController.getProjectBySlug);

export default router;
