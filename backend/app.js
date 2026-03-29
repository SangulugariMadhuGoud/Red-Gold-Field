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

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/profile", profileRoutes);

export default app;
