const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");
dotenv.config();

// Import routes
const testRoutes = require("./routes/testRoutes.js");
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middleware/errorMiddleware');


// Create Express app
const app = express();
//const path = require("path");

// set HTTP security headers to protect app
app.use(helmet());


// Enable CORS (Cross-Origin Resource Sharing) so React frontend can talk to backend
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

// Mount routes under /api
app.use("/api", testRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// 
app.use(errorHandler);

// Used for handling errors that are not caught by errorHandler
app.use((err, req, res, next) => {
  console.error("last error server catch", err);

  res.status(500).json({
    success: false,
    message: "Server error",
  });
});

//Export app (used in server.js)
module.exports = app;