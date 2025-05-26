//this is the access point for all things database related!

const db = require("./db");

const Sleep = require("./models/Sleep");
const Step = require("./models/Step");
const Food = require("./models/Food");
const User = require("./models/User");

//associations could go here!
User.hasMany(Step);
Step.belongsTo(User);

User.hasMany(Food);
Food.belongsTo(User);

User.hasMany(Sleep);
Sleep.belongsTo(User);

module.exports = {
  db,
  models: {
    Food,
    Sleep,
    Step,
    User,
  },
};
