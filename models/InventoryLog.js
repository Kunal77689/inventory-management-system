const { DataTypes } = require("sequelize");
const sequelize = require("./index");
const Product = require("./Product");

const InventoryLog = sequelize.define(
  "InventoryLog",
  {
    LogID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    Action: {
      type: DataTypes.ENUM("Add", "Update", "Delete"),
      allowNull: false,
    },
    Quantity: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    timestamps: false,
  }
);

InventoryLog.belongsTo(Product, { foreignKey: "ProductID" });

module.exports = InventoryLog;
