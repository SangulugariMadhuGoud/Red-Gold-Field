// Database connection configuration
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongodbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/rgf';

    await mongoose.connect(mongodbUri, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

mongoose.connection.on('connected', () => console.log('Mongoose connected to cluster'));
mongoose.connection.on('error', (err) => console.error('Mongoose connection error:', err));
mongoose.connection.on('disconnected', () => console.warn('Mongoose disconnected'));

module.exports = connectDB;