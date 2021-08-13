const express = require("express");
const router = express.Router();

const User = require("../models/User");
const { ERROR_INVALID_SIGNUP_INPUT } = require("../constants/errorConstants");

router.get("/", function (req, res, next) {
  res.render("signup", { title: "바닐라코딩" });
});

router.post("/", function (req, res, next) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    next(createError(400, ERROR_INVALID_SIGNUP_INPUT));
  }

  const user = new User(req.body);

  try {
    user.save();

    return res.redirect(302, "/login");
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
