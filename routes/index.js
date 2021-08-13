const express = require("express");
const router = express.Router();
const Problem = require("../models/Problem");

router.get("/", async function (req, res, next) {
  const problems = await Problem.find({});

  res.render("index", { problems });
});

module.exports = router;
