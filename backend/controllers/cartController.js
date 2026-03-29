// Cart controller - handles request/response logic for cart endpoints
import cartService from "../services/cartService.js";

const cartController = {
  // Get cart items for user
  getCartItems: async (req, res) => {
    try {
      const cartItems = await cartService.getCartItems(req.user.id);
      res.json(cartItems);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  },

  // Add item to cart
  addToCart: async (req, res) => {
    const { productId, quantity = 1 } = req.body;

    try {
      const cartItem = await cartService.addToCart(
        req.user.id,
        productId,
        quantity,
      );
      res.json(cartItem);
    } catch (error) {
      console.error("Error adding to cart:", error);
      res.status(error.status || 500).json({ message: error.message });
    }
  },

  // Update cart item
  updateCartItem: async (req, res) => {
    const { quantity } = req.body;

    try {
      const cartItem = await cartService.updateCartItem(
        req.user.id,
        req.params.id,
        quantity,
      );
      res.json(cartItem);
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  },

  // Remove item from cart
  removeFromCart: async (req, res) => {
    try {
      await cartService.removeFromCart(req.user.id, req.params.id);
      res.json({ message: "Item removed from cart" });
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  },
};

export default cartController;
