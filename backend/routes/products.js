// Product routes - defines API endpoints for product management
import express from "express";
import productController from "../controllers/productController.js";

const router = express.Router();

// Get all products
router.get("/", productController.getAllProducts);

// Get product by id or slug
router.get("/:id", productController.getProductByIdOrSlug);

export default router;
