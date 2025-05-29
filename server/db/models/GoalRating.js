// db/models/GoalRating.js
const { DataTypes } = require("sequelize");
const db = require("../db");

const GoalRating = db.define("goalRating", {
  date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 10,
    },
  },
});

module.exports = GoalRating;
