const router = require("express").Router();
const {
  models: { Food, User },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const foods = await Food.findAll({ include: [User] });
    res.json(foods);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const food = await Food.findByPk(req.params.id, { include: [User] });
    res.json(food);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    res.status(201).send(await Food.create(req.body));
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const food = await Food.findByPk(req.params.id);
    res.send(await food.update(req.body));
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const food = await Food.findByPk(req.params.id);
    await food.destroy();
    res.send(food);
  } catch (err) {
    next(err);
  }
});
