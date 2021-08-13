const express = require("express");
const router = express.Router();
const Problem = require("../models/Problem");
const vm = require("vm");

router.get("/:problem_id", async function (req, res, next) {
  const id = req.params.problem_id;

  const problem = await Problem.findOne({ id });

  res.render("problem", { problem });
});

router.post("/:problem_id", async function (req, res, next) {
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
      return res.render("failure", {
        type: "compileError",
        errorCase: testCases[i].code,
      });
    }

    const testResult = context.result === testCases[i].solution;

    if (!testResult) {
      failedTestCases.push({
        testCase : testCases[i].code,
        answer: context.result,
        solution: testCases[i].solution,
      });
    }
  }

  if (failedTestCases.length === 0) {
    return res.render("success");
  }

  res.render("failure", { failedTestCases, type: "testCaseFail" });
});

module.exports = router;
