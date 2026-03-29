// Order service - contains business logic for order management
import Order from "../models/Order.js";
import OrderItem from "../models/OrderItem.js";
import CartItem from "../models/CartItem.js";

const orderService = {
  // Get user's orders
  getUserOrders: async (userId) => {
    return await Order.find({ userId }).sort({ createdAt: -1 });
  },

  // Create order
  createOrder: async (userId, shippingAddress, paymentMethod = "cod") => {
    const cartItems = await CartItem.find({ userId }).populate("productId");

    if (cartItems.length === 0) {
      const error = new Error("Cart is empty");
      error.status = 400;
      throw error;
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
      userId,
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
    await CartItem.deleteMany({ userId });

    return order;
  },

  // Get order by ID
  getOrderById: async (userId, orderId) => {
    const order = await Order.findOne({
      _id: orderId,
      userId,
    });

    if (!order) {
      const error = new Error("Order not found");
      error.status = 404;
      throw error;
    }

    const orderItems = await OrderItem.find({ orderId: order._id });
    return { order, items: orderItems };
  },
};

export default orderService;
