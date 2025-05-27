const router = require("express").Router();
const {
  models: { Sleep, User },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const where = {};
    if (req.query.userId) {
      where.userId = req.query.userId;
    }

    const sleeps = await Sleep.findAll({ where, include: [User] });
    res.json(sleeps);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const sleep = await Sleep.findByPk(req.params.id, { include: [User] });
    res.json(sleep);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    res.status(201).send(await Sleep.create(req.body));
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const sleep = await Sleep.findByPk(req.params.id);
    res.send(await sleep.update(req.body));
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const sleep = await Sleep.findByPk(req.params.id);
    await sleep.destroy();
    res.send(sleep);
  } catch (err) {
    next(err);
  }
});
