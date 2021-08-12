const express = require("express");
const router = express.Router();
const Problem = require("../models/Problem");

router.get("/", async (req, res, next) => {
  const problems = await Problem.find({});

  res.render("index", { problems });
});

module.exports = router;
