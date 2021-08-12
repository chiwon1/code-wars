const express = require("express");
const router = express.Router();
const Problem = require("../models/Problem");

router.get("/:problem_id", async (req, res, next) => {
  const id = parseInt(req.params.problem_id);
  const problem = await Problem.findOne({ id });

  res.render("problem", { problem });
});

module.exports = router;
