// Product controller - handles request/response logic for product endpoints
import productService from "../services/productService.js";

const productController = {
  // Get all products
  getAllProducts: async (req, res) => {
    try {
      const products = await productService.getAllProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  },

  // Get product by id or slug
  getProductByIdOrSlug: async (req, res) => {
    try {
      const product = await productService.getProductByIdOrSlug(req.params.id);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  },
};

export default productController;
