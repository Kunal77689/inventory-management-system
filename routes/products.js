const express = require("express");
const authenticateUser = require("../middlewares/authMiddleware"); // Import the middleware
const {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const router = express.Router();

router.post("/", authenticateUser, createProduct);
router.get("/", getAllProducts);
router.put("/:ProductID", updateProduct); // Add for updating product
router.delete("/:ProductID", deleteProduct); // Add for deleting product

module.exports = router;
