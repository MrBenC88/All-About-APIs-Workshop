require("dotenv").config(); // allows you to separate secrets from your source code - important for .ENV file.

const PORT = process.env.PORT || 5000; 
const MONGODB_URI = process.env.MONGODB_URI;

module.exports = { MONGODB_URI, PORT }