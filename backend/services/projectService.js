// Project service - contains business logic for project management
import mongoose from "mongoose";
import Project from "../models/Project.js";

const projectService = {
  // Get all projects
  getAllProjects: async () => {
    if (mongoose.connection.readyState !== 1) {
      throw new Error("Database not connected");
    }

    const projects = await Project.find();
    if (projects.length === 0) {
      const fallback = [
        {
          slug: "srikakulam-greens",
          name: "Srikakulam Greens",
          location: "Srikakulam District, Andhra Pradesh",
          size: "200 – 500 sq. yards",
          status: "open",
          tag: "Featured",
          imageUrl: "/project-farm.jpg",
          description:
            "A structured farmland project with Red Sandalwood plantation integration.",
          overview: "Fallback project data.",
          connectivity: "Fallback connectivity details.",
          pricing: "Contact for pricing",
          layoutFeatures: ["Defined plots", "Internal roads"],
          documentation: ["Sale Agreement", "Survey Map"],
          images: ["/project-farm.jpg", "/hero-forest.jpg"],
        },
      ];
      return fallback;
    }

    return projects;
  },

  // Get project by slug
  getProjectBySlug: async (slug) => {
    if (mongoose.connection.readyState !== 1) {
      throw new Error("Database not connected");
    }

    let project = await Project.findOne({ slug });

    if (!project) {
      // Fallback static project if DB is empty or missing
      const serverFallback = {
        slug: "srikakulam-greens",
        name: "Srikakulam Greens",
        location: "Srikakulam District, Andhra Pradesh",
        size: "200 – 500 sq. yards",
        status: "open",
        tag: "Featured",
        imageUrl: "/project-farm.jpg",
        description:
          "A structured farmland project with Red Sandalwood plantation integration.",
        overview: "Fallback project data.",
        connectivity: "Fallback connectivity details.",
        pricing: "Contact for pricing",
        layoutFeatures: ["Defined plots", "Internal roads"],
        documentation: ["Sale Agreement", "Survey Map"],
        images: ["/project-farm.jpg", "/hero-forest.jpg"],
      };
      if (slug === serverFallback.slug) {
        project = serverFallback;
      }
    }

    return project;
  },
};

export default projectService;
