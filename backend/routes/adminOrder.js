// Admin order routes
import express from "express";
import orderController from "../controllers/orderController.js";

const router = express.Router();

// GET /api/admin/orders - get all orders
router.get("/", orderController.getAllOrders);

// GET /api/admin/orders/:id - get order by id
router.get("/:id", orderController.getOrderById);

// PUT /api/admin/orders/:id/status - update order status
router.put("/:id/status", orderController.updateOrderStatus);

export default router;
