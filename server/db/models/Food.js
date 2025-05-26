// db/models/Food.js
const { DataTypes } = require("sequelize");
const db = require("../db");

const Food = db.define("food", {
  date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  healthy: {
    type: DataTypes.ENUM("poor", "average", "good"),
    allowNull: false,
  },
  portion: {
    type: DataTypes.ENUM("poor", "average", "good"),
    allowNull: false,
  },
});

module.exports = Food;
