// db/models/Goal.js
const { DataTypes } = require("sequelize");
const db = require("../db");

const Goal = db.define("goal", {
  category: {
    type: DataTypes.STRING, // e.g. "App Dev", "Walking", etc.
    allowNull: false,
  },
  targetMinutes: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Goal;
