// Order model - defines the database schema for customer orders
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: 'pending',
  },
  total: {
    type: Number,
    required: true,
  },
  shippingAddress: {
    type: Object,
    required: true,
  },
  paymentMethod: {
    type: String,
    default: 'cod',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Order', orderSchema);