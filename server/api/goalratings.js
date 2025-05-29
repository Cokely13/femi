const router = require("express").Router();
const {
  models: { GoalRating, User, Goal },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const where = {};
    if (req.query.userId) {
      where.userId = req.query.userId;
    }
    const ratings = await GoalRating.findAll({ where, include: [User, Goal] });
    res.json(ratings);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const rating = await GoalRating.findByPk(req.params.id, {
      include: [User, Goal],
    });
    res.json(rating);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    res.status(201).send(await GoalRating.create(req.body));
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const rating = await GoalRating.findByPk(req.params.id);
    res.send(await rating.update(req.body));
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const rating = await GoalRating.findByPk(req.params.id);
    await rating.destroy();
    res.send(rating);
  } catch (err) {
    next(err);
  }
});
