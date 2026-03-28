// Project routes - defines API endpoints for project management
const express = require('express');
const mongoose = require('mongoose');
const Project = require('../models/Project');

const router = express.Router();

// Get all projects
router.get('/', async (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ message: 'Database not connected' });
  }

  try {
    const projects = await Project.find();
    if (projects.length === 0) {
      const fallback = [
        {
          slug: 'srikakulam-greens',
          name: 'Srikakulam Greens',
          location: 'Srikakulam District, Andhra Pradesh',
          size: '200 – 500 sq. yards',
          status: 'open',
          tag: 'Featured',
          imageUrl: '/project-farm.jpg',
          description: 'A structured farmland project with Red Sandalwood plantation integration.',
          overview: 'Fallback project data.',
          connectivity: 'Fallback connectivity details.',
          pricing: 'Contact for pricing',
          layoutFeatures: ['Defined plots', 'Internal roads'],
          documentation: ['Sale Agreement', 'Survey Map'],
          images: ['/project-farm.jpg', '/hero-forest.jpg'],
        },
      ];
      return res.json(fallback);
    }

    res.json(projects);
  } catch (error) {
    console.error('projects route error', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get project by slug
router.get('/:slug', async (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ message: 'Database not connected' });
  }

  try {
    let project = await Project.findOne({ slug: req.params.slug });

    if (!project) {
      // Fallback static project if DB is empty or missing
      const serverFallback = {
        slug: 'srikakulam-greens',
        name: 'Srikakulam Greens',
        location: 'Srikakulam District, Andhra Pradesh',
        size: '200  500 sq. yards',
        status: 'open',
        tag: 'Featured',
        imageUrl: '/project-farm.jpg',
        description: 'A structured farmland project with Red Sandalwood plantation integration.',
        overview: 'Fallback project data.',
        connectivity: 'Fallback connectivity details.',
        pricing: 'Contact for pricing',
        layoutFeatures: ['Defined plots', 'Internal roads'],
        documentation: ['Sale Agreement', 'Survey Map'],
        images: ['/project-farm.jpg', '/hero-forest.jpg'],
      };
      if (req.params.slug === serverFallback.slug) {
        project = serverFallback;
      }
    }

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    console.error('project detail error', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
