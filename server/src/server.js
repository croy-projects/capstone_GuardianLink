const app = require("./app.js");
const dotenv = require("dotenv");

dotenv.config();

// Set port (can also use .env)
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});