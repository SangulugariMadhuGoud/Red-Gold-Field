// Product service - contains business logic for product management
import mongoose from "mongoose";
import Product from "../models/Product.js";

const productService = {
  // Get all products
  getAllProducts: async () => {
    return await Product.find();
  },

  // Get product by id or slug
  getProductByIdOrSlug: async (id) => {
    let product = null;

    if (mongoose.Types.ObjectId.isValid(id)) {
      product = await Product.findById(id);
    }

    if (!product) {
      product = await Product.findOne({ slug: id });
    }

    return product;
  },
};

export default productService;
