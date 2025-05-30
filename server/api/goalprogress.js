const router = require("express").Router();
const {
  models: { GoalProgress, User, Goal },
} = require("../db");
module.exports = router;

// Get all progress for a user on a specific date
router.get("/", async (req, res, next) => {
  try {
    const { userId, date } = req.query;
    const where = {};
    if (userId) where.userId = userId;
    if (date) where.date = date;

    const progress = await GoalProgress.findAll({ where, include: [Goal] });
    res.json(progress);
  } catch (err) {
    next(err);
  }
});

// Update or create progress for a goal on a date
router.put("/:goalId", async (req, res, next) => {
  try {
    const { goalId } = req.params;
    const { userId, date, minutesCompleted } = req.body;

    let progress = await GoalProgress.findOne({
      where: { goalId, userId, date },
    });

    if (progress) {
      progress.minutesCompleted = minutesCompleted;
      await progress.save();
    } else {
      progress = await GoalProgress.create({
        goalId,
        userId,
        date,
        minutesCompleted,
      });
    }

    res.json(progress);
  } catch (err) {
    next(err);
  }
});
