// Admin product routes
import express from "express";
import productController from "../controllers/productController.js";

const router = express.Router();

// GET /api/admin/products - get all products
router.get("/", productController.getAllProducts);

// POST /api/admin/products - create product
router.post("/", productController.createProduct);

// GET /api/admin/products/:id - get product by id
router.get("/:id", productController.getProductByIdOrSlug);

// PUT /api/admin/products/:id - update product
router.put("/:id", productController.updateProduct);

// DELETE /api/admin/products/:id - delete product
router.delete("/:id", productController.deleteProduct);

export default router;
