const app = require("./app.js");

require("dotenv").config();

// Set port
const PORT = process.env.PORT || 5000;

// Set host
// localhost = '127.0.0.1'
//'0.0.0.0' accessible from other devices on the same network
const HOST = process.env.HOST || '127.0.0.1'; 

// Start server
app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}/`);
});