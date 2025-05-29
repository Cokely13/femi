// const { DataTypes } = require("sequelize");
// const db = require("../db");

// const Goal = db.define("goal", {
//   category: {
//     type: DataTypes.ENUM(
//       "App Development",
//       "Walking",
//       "Job Applications",
//       "Algorithm Practice",
//       "Sleep",
//       "Food",
//       "Steps",
//       "Work",
//       "Gym",
//       "Bike",
//       "Swim",
//       "Reading",
//       "Other"
//     ),
//     allowNull: false,
//   },
//   targetMinutes: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
//   frequency: {
//     type: DataTypes.ENUM("Daily", "Weekdays", "Weekends", "Weekly", "One-Time"),
//     allowNull: false,
//     defaultValue: "Daily",
//   },
// });

// module.exports = Goal;

// db/models/Goal.js
const { DataTypes } = require("sequelize");
const db = require("../db");

const Goal = db.define("goal", {
  category: {
    type: DataTypes.ENUM(
      "App Development",
      "Walking",
      "Job Applications",
      "Algorithm Practice",
      "Sleep",
      "Food",
      "Steps",
      "Work",
      "Gym",
      "Bike",
      "Swim",
      "Reading",
      "Other"
    ),
    allowNull: false,
  },
  targetMinutes: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  frequency: {
    type: DataTypes.ENUM("Daily", "Weekdays", "Weekends", "Weekly", "One-Time"),
    allowNull: false,
    defaultValue: "Daily",
  },
  date: {
    type: DataTypes.STRING, // Format: "YYYY-MM-DD"
    allowNull: true, // Required only for "Daily", optional otherwise
  },
});

module.exports = Goal;
