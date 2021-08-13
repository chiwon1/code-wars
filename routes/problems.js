const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const vm = require("vm");
const createError = require("http-errors");

const Problem = require("../models/Problem");

const {
  ERROR_NOT_FOUND,
  ERROR_INVALID_PROBLEM_ID,
  ERROR_INVALID_SOLUTION_INPUT,
} = require("../constants/errorConstants");

router.get("/:problem_id", async function (req, res, next) {
  const id = req.params.problem_id;

  if (!mongoose.isValidObjectId(id)) {
    next(createError(400, ERROR_INVALID_PROBLEM_ID));
  }

  const problem = await Problem.findById(id);

  if (!problem) {
    next(createError(404, ERROR_NOT_FOUND));
  }

  res.render("problem", { problem });
});

router.post("/:problem_id", async function (req, res, next) {
  const id = parseInt(req.params.problem_id);

  if (!mongoose.isValidObjectId(id)) {
    next(createError(400, ERROR_INVALID_PROBLEM_ID));
  }

  const problem = await Problem.findById(id);

  if (!problem) {
    next(createError(404, ERROR_NOT_FOUND));
  }

  const testCases = problem.tests;
  const solution = req.body.solution;

  if (!solution) {
    throw createError(400, ERROR_INVALID_SOLUTION_INPUT);
  }

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
