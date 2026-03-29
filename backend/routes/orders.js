// Order routes - defines API endpoints for order management
import express from "express";
import orderController from "../controllers/orderController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// Get user's orders
router.get("/", auth, orderController.getUserOrders);

// Create order
router.post("/", auth, orderController.createOrder);

// Get order by ID
router.get("/:id", auth, orderController.getOrderById);

export default router;
