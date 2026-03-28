// Cart routes - defines API endpoints for shopping cart management
const express = require("express");
const CartItem = require("../models/CartItem");
const Product = require("../models/Product");
const { auth } = require("../middleware/auth");

const router = express.Router();

// Get cart items for user
router.get("/", auth, async (req, res) => {
  try {
    const cartItems = await CartItem.find({ userId: req.user.userId }).populate(
      "productId",
    );
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Add item to cart
router.post("/", auth, async (req, res) => {
  const { productId, quantity = 1 } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cartItem = await CartItem.findOne({
      userId: req.user.userId,
      productId,
    });
    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      cartItem = new CartItem({ userId: req.user.userId, productId, quantity });
      await cartItem.save();
    }

    await cartItem.populate("productId");
    res.json(cartItem);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update cart item
router.put("/:id", auth, async (req, res) => {
  const { quantity } = req.body;

  try {
    const cartItem = await CartItem.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      { quantity },
      { new: true },
    ).populate("productId");

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.json(cartItem);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Remove item from cart
router.delete("/:id", auth, async (req, res) => {
  try {
    const cartItem = await CartItem.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId,
    });

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.json({ message: "Item removed from cart" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
