// Order controller - handles request/response logic for order endpoints
import orderService from "../services/orderService.js";

const orderController = {
  // Get user's orders
  getUserOrders: async (req, res) => {
    try {
      const orders = await orderService.getUserOrders(req.user.userId);
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  },

  // Create order
  createOrder: async (req, res) => {
    const { shippingAddress, paymentMethod = "cod" } = req.body;

    try {
      const order = await orderService.createOrder(
        req.user.userId,
        shippingAddress,
        paymentMethod,
      );
      res.status(201).json(order);
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  },

  // Get order by ID
  getOrderById: async (req, res) => {
    try {
      const result = await orderService.getOrderById(
        req.user.userId,
        req.params.id,
      );
      res.json(result);
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  },
};

export default orderController;
