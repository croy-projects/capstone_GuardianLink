const express = require("express");
const cors = require("cors");

// Create Express app
const app = express();


// Middleware = functions that run before routes

// Enable CORS so React frontend can talk to backend
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// Basic test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Example API endpoint
app.get("/api/data", (req, res) => {
  res.json({ message: "Hello from backend!" });
});

// Import routes
const testRoutes = require("./routes/testRoutes.js");

// Mount routes under /api
app.use("/api", testRoutes);

// Export app (used in server.js)
module.exports = app;