const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const Product = sequelize.define(
  "Product",
  {
    ProductID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Name: { type: DataTypes.STRING, allowNull: false },
    Description: { type: DataTypes.TEXT },
    Category: { type: DataTypes.STRING },
    Price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    Stock: { type: DataTypes.INTEGER, allowNull: false },
    Barcode: { type: DataTypes.STRING, unique: true, allowNull: false },
    PartNumber: { type: DataTypes.STRING, unique: true, allowNull: false },
  },
  {
    timestamps: false,
  }
);

module.exports = Product;
