const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Create a new Sequelize instance for connecting to MySQL
const sequelize = new Sequelize(
  process.env.DB_NAME, // Database name
  process.env.DB_USER, // Database username
  process.env.DB_PASSWORD, // Database password
  {
    host: process.env.DB_HOST, // Database host (e.g., localhost)
    dialect: "mysql", // Use MySQL dialect
    logging: false, // Disable SQL logging (optional)
  }
);

// Test the database connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

// Export the connection instance
module.exports = sequelize;
