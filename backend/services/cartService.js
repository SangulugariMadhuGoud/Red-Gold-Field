// Cart service - contains business logic for shopping cart management
import CartItem from "../models/CartItem.js";
import Product from "../models/Product.js";

const cartService = {
  // Get cart items for user
  getCartItems: async (userId) => {
    return await CartItem.find({ userId }).populate("productId");
  },

  // Add item to cart
  addToCart: async (userId, productId, quantity = 1) => {
    const product = await Product.findById(productId);
    if (!product) {
      const error = new Error("Product not found");
      error.status = 404;
      throw error;
    }

    let cartItem = await CartItem.findOne({
      userId,
      productId,
    });
    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      cartItem = new CartItem({ userId, productId, quantity });
      await cartItem.save();
    }

    await cartItem.populate("productId");
    return cartItem;
  },

  // Update cart item
  updateCartItem: async (userId, cartItemId, quantity) => {
    const cartItem = await CartItem.findOneAndUpdate(
      { _id: cartItemId, userId },
      { quantity },
      { new: true },
    ).populate("productId");

    if (!cartItem) {
      const error = new Error("Cart item not found");
      error.status = 404;
      throw error;
    }

    return cartItem;
  },

  // Remove item from cart
  removeFromCart: async (userId, cartItemId) => {
    const cartItem = await CartItem.findOneAndDelete({
      _id: cartItemId,
      userId,
    });

    if (!cartItem) {
      const error = new Error("Cart item not found");
      error.status = 404;
      throw error;
    }

    return cartItem;
  },
};

export default cartService;
