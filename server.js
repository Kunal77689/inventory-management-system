const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const sequelize = require("./models/index");

const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");
const logRoutes = require("./routes/logs");

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Route Middleware
app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/logs", logRoutes);

// Start Server
sequelize.sync().then(() => {
  app.listen(process.env.PORT, () =>
    console.log(`Server running on port ${process.env.PORT}`)
  );
});
