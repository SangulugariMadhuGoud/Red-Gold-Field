// Project controller - handles request/response logic for project endpoints
import projectService from "../services/projectService.js";

const projectController = {
  // Get all projects
  getAllProjects: async (req, res) => {
    try {
      const projects = await projectService.getAllProjects();
      res.json(projects);
    } catch (error) {
      if (error.message === "Database not connected") {
        return res.status(503).json({ message: error.message });
      }
      console.error("projects route error", error);
      res.status(500).json({ message: "Server error" });
    }
  },

  // Get project by slug
  getProjectBySlug: async (req, res) => {
    try {
      const project = await projectService.getProjectBySlug(req.params.slug);

      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }

      res.json(project);
    } catch (error) {
      if (error.message === "Database not connected") {
        return res.status(503).json({ message: error.message });
      }
      console.error("project detail error", error);
      res.status(500).json({ message: "Server error" });
    }
  },

  // Create new project (admin)
  createProject: async (req, res) => {
    try {
      const project = await projectService.createProject(req.body);
      res.status(201).json(project);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  },

  // Update project (admin)
  updateProject: async (req, res) => {
    try {
      const project = await projectService.updateProject(
        req.params.slug,
        req.body,
      );
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  },

  // Delete project (admin)
  deleteProject: async (req, res) => {
    try {
      const project = await projectService.deleteProject(req.params.slug);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.json({ message: "Project deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  },
};

export default projectController;
