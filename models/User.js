const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const User = sequelize.define(
  "User",
  {
    UserID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    Username: { type: DataTypes.STRING, unique: true, allowNull: false },
    Password: { type: DataTypes.STRING, allowNull: false },
    Role: { type: DataTypes.ENUM("Admin", "Staff"), allowNull: false },
  },
  {
    timestamps: false,
  }
);

module.exports = User;
