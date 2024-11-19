const Product = require("../models/Product");

const generateBarcode = () => {
  return "BAR-" + Math.random().toString(36).substring(2, 10).toUpperCase();
};

const generatePartNumber = () => {
  return "PN-" + Math.random().toString(36).substring(2, 10).toUpperCase();
};

const createProduct = async (req, res) => {
  const { Role } = req.user; // Assuming you attach user info to the request after login
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized access" });
  }

  if (Role !== "Admin") {
    return res
      .status(403)
      .json({ message: "You do not have permission to perform this action" });
  }
  const { Name, Description, Category, Price, Stock } = req.body;
  const Barcode = generateBarcode();
  const PartNumber = generatePartNumber();

  try {
    const product = await Product.create({
      Name,
      Description,
      Category,
      Price,
      Stock,
      Barcode,
      PartNumber,
    });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  const { ProductID } = req.params;
  const { Name, Description, Category, Price, Stock, Barcode, PartNumber } =
    req.body;

  try {
    const product = await Product.findByPk(ProductID);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Update product details
    product.Name = Name || product.Name;
    product.Description = Description || product.Description;
    product.Category = Category || product.Category;
    product.Price = Price || product.Price;
    product.Stock = Stock || product.Stock;
    product.Barcode = Barcode || product.Barcode;
    product.PartNumber = PartNumber || product.PartNumber;

    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  const { ProductID } = req.params;

  try {
    const product = await Product.findByPk(ProductID);
    if (!product) return res.status(404).json({ message: "Product not found" });

    await product.destroy();
    res.status(204).send(); // No content after deletion
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
};
