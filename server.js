import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import todoRoutes from "./routes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/todos";

mongoose.connect(MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Routes
app.use("/todos", todoRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ 
    error: "Internal server error",
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
