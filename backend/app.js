// Express app setup - configures middleware, routes, and database connection
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/database.js";

dotenv.config();

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js";
import projectRoutes from "./routes/projects.js";
import cartRoutes from "./routes/cart.js";
import orderRoutes from "./routes/orders.js";
import profileRoutes from "./routes/profile.js";
import contactRoutes from "./routes/contact.js";
import siteVisitRoutes from "./routes/siteVisit.js";
import adminContactRoutes from "./routes/adminContact.js";
import adminSiteVisitRoutes from "./routes/adminSiteVisit.js";
import adminProductRoutes from "./routes/adminProduct.js";
import adminProjectRoutes from "./routes/adminProject.js";
import adminOrderRoutes from "./routes/adminOrder.js";

// Middleware
import isAdmin from "./middleware/isAdmin.js";
import { auth } from "./middleware/auth.js";

// Public routes
app.use("/api/public/auth", authRoutes);
app.use("/api/public/products", productRoutes);
app.use("/api/public/projects", projectRoutes);
app.use("/api/public/contact", contactRoutes);
app.use("/api/public/site-visit", siteVisitRoutes);

// User routes
app.use("/api/user/cart", auth, cartRoutes);
app.use("/api/user/orders", auth, orderRoutes);
app.use("/api/user/profile", auth, profileRoutes);

// Admin routes
app.use("/api/admin/contacts", auth, isAdmin, adminContactRoutes);
app.use("/api/admin/site-visits", auth, isAdmin, adminSiteVisitRoutes);
app.use("/api/admin/products", auth, isAdmin, adminProductRoutes);
app.use("/api/admin/projects", auth, isAdmin, adminProjectRoutes);
app.use("/api/admin/orders", auth, isAdmin, adminOrderRoutes);

export default app;
