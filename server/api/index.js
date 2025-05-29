const router = require("express").Router();
module.exports = router;

// API route registration
router.use("/users", require("./users"));
router.use("/steps", require("./steps"));
router.use("/foods", require("./foods"));
router.use("/sleeps", require("./sleeps"));
router.use("/goals", require("./goal"));
router.use("/goalratings", require("./goalrating"));

// 404 handler for undefined API routes
router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
