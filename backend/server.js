const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const productRoutes = require("./routes/products");

dotenv.config();
const app = express();

// Middleware
app.use(express.json());

// Enable CORS for React frontend running on localhost:3000
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

// Simple route to test CORS is working
app.get("/test-cors", (req, res) => {
  res.json({ message: "CORS is working!" });
});

// Use product routes with /api prefix
app.use("/api", productRoutes);

// DB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");

    // Start server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));
