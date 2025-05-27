const router = require("express").Router();
const {
  models: { Step, User },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const where = {};
    if (req.query.userId) {
      where.userId = req.query.userId;
    }
    const steps = await Step.findAll({ where, include: [User] });
    res.json(steps);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const step = await Step.findByPk(req.params.id, { include: [User] });
    res.json(step);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    res.status(201).send(await Step.create(req.body));
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const step = await Step.findByPk(req.params.id);
    res.send(await step.update(req.body));
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const step = await Step.findByPk(req.params.id);
    await step.destroy();
    res.send(step);
  } catch (err) {
    next(err);
  }
});
