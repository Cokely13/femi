// db/models/Sleep.js
const { DataTypes } = require("sequelize");
const db = require("../db");

const Sleep = db.define("sleep", {
  date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quality: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 10,
    },
  },
  time: {
    type: DataTypes.INTEGER,
    allowNull: false, // e.g., total sleep time in minutes or hours
  },
});

module.exports = Sleep;
