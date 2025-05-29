const router = require("express").Router();
const {
  models: { Goal, User },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const where = {};
    if (req.query.userId) {
      where.userId = req.query.userId;
    }
    const goals = await Goal.findAll({ where, include: [User] });
    res.json(goals);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const goal = await Goal.findByPk(req.params.id, { include: [User] });
    res.json(goal);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    res.status(201).send(await Goal.create(req.body));
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const goal = await Goal.findByPk(req.params.id);
    res.send(await goal.update(req.body));
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const goal = await Goal.findByPk(req.params.id);
    await goal.destroy();
    res.send(goal);
  } catch (err) {
    next(err);
  }
});
