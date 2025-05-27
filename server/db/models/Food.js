// db/models/Food.js
const { DataTypes } = require("sequelize");
const db = require("../db");

const Food = db.define("food", {
  date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  healthy: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 10,
    },
  },
  portion: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 10,
    },
  },
});

module.exports = Food;
