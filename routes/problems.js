const express = require("express");
const router = express.Router();
const Problem = require("../models/Problem");
const vm = require("vm");

router.get("/:problem_id", async (req, res, next) => {
  const id = parseInt(req.params.problem_id);
  const problem = await Problem.findOne({ id });

  res.render("problem", { problem });
});

router.post("/:problem_id", async (req, res, next) => {
  const id = parseInt(req.params.problem_id);
  const problem = await Problem.findOne({ id });
  const testCases = problem.tests;
  const solution = req.body.solution;

  const context = { result: null };
  const failedTestCases = [];

  for (let  i = 0; i < testCases.length; i++) {
    const code = `${solution} \n result = ${testCases[i].code}`;

    try {
      vm.runInNewContext(code, context);
    } catch (err) {
      return;
    }
  }

});

module.exports = router;
