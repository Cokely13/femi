const { DataTypes } = require("sequelize");
const db = require("../db");

const User = db.define("user", {
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: { notEmpty: true },
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: { isEmail: true },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // optional extras
  profileImage: {
    type: DataTypes.STRING,
    defaultValue: "",
  },
});

module.exports = User;
