//this is the access point for all things database related!

const db = require("./db");

const Sleep = require("./models/Sleep");
const Step = require("./models/Step");
const Food = require("./models/Food");
const User = require("./models/User");
const Goal = require("./models/Goal");
const GoalRating = require("./models/GoalRating");

//associations could go here!
User.hasMany(Step);
Step.belongsTo(User);

User.hasMany(Food);
Food.belongsTo(User);

User.hasMany(Sleep);
Sleep.belongsTo(User);
User.hasMany(Goal);
Goal.belongsTo(User);

User.hasMany(GoalRating);
GoalRating.belongsTo(User);

Goal.hasMany(GoalRating);
GoalRating.belongsTo(Goal);

module.exports = {
  db,
  models: {
    Food,
    Sleep,
    Step,
    User,
    Goal,
    GoalRating,
  },
};
