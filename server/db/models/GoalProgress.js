const { DataTypes } = require("sequelize");
const db = require("../db");

const GoalProgress = db.define("goalProgress", {
  date: {
    type: DataTypes.STRING, // format: "YYYY-MM-DD"
    allowNull: false,
  },
  minutesCompleted: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
});

module.exports = GoalProgress;
