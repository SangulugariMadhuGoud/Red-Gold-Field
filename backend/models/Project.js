const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['open', 'limited', 'coming-soon'],
    default: 'coming-soon',
  },
  tag: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  overview: {
    type: String,
  },
  connectivity: {
    type: String,
  },
  pricing: {
    type: String,
  },
  layoutFeatures: {
    type: [String],
  },
  documentation: {
    type: [String],
  },
  images: {
    type: [String],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Project', projectSchema);
