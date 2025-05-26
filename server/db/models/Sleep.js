// db/models/Sleep.js
const { DataTypes } = require("sequelize");
const db = require("../db");

const Sleep = db.define("sleep", {
  date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quality: {
    type: DataTypes.ENUM("poor", "average", "good"),
    allowNull: false,
  },
  time: {
    type: DataTypes.INTEGER,
    allowNull: false, // e.g., total sleep time in minutes or hours
  },
});

module.exports = Sleep;
