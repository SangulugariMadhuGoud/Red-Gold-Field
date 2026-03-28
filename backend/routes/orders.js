// Order routes - defines API endpoints for order management
const express = require("express");
const Order = require("../models/Order");
const OrderItem = require("../models/OrderItem");
const CartItem = require("../models/CartItem");
const { auth } = require("../middleware/auth");

const router = express.Router();

// Get user's orders
router.get("/", auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.userId }).sort({
      createdAt: -1,
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Create order
router.post("/", auth, async (req, res) => {
  const { shippingAddress, paymentMethod = "cod" } = req.body;

  try {
    const cartItems = await CartItem.find({ userId: req.user.userId }).populate(
      "productId",
    );

    if (cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let total = 0;
    const orderItems = [];

    for (const cartItem of cartItems) {
      const itemTotal = cartItem.productId.price * cartItem.quantity;
      total += itemTotal;

      orderItems.push({
        productId: cartItem.productId._id,
        productName: cartItem.productId.name,
        quantity: cartItem.quantity,
        price: cartItem.productId.price,
      });
    }

    const order = new Order({
      userId: req.user.userId,
      total,
      shippingAddress,
      paymentMethod,
    });

    await order.save();

    // Create order items
    for (const item of orderItems) {
      const orderItem = new OrderItem({
        ...item,
        orderId: order._id,
      });
      await orderItem.save();
    }

    // Clear cart
    await CartItem.deleteMany({ userId: req.user.userId });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get order by ID
router.get("/:id", auth, async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      userId: req.user.userId,
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const orderItems = await OrderItem.find({ orderId: order._id });
    res.json({ order, items: orderItems });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
