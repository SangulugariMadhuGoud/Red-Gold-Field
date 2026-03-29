// Admin project routes
import express from "express";
import projectController from "../controllers/projectController.js";

const router = express.Router();

// GET /api/admin/projects - get all projects
router.get("/", projectController.getAllProjects);

// POST /api/admin/projects - create project
router.post("/", projectController.createProject);

// GET /api/admin/projects/:slug - get project by slug
router.get("/:slug", projectController.getProjectBySlug);

// PUT /api/admin/projects/:slug - update project
router.put("/:slug", projectController.updateProject);

// DELETE /api/admin/projects/:slug - delete project
router.delete("/:slug", projectController.deleteProject);

export default router;
