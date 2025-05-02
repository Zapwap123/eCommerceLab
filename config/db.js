// This file sets up the database connection using mysql2 and dotenv for environment variables.
const mysql = require("mysql2/promise");
require("dotenv").config();

// Create a connection pool to the MySQL database using environment variables
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// Test the database connection
db.getConnection()
  .then(() => {
    console.log("✅ Connected to the database successfully");
  })
  .catch((err) => {
    console.error("❌ Database connection error:", err.message);
  });

module.exports = db;
