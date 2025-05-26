const Sequelize = require("sequelize");
const db = require("../db");

const Step = db.define("step", {
  date: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  value: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Step;
