const express = require("express");
const router = express.Router();

const createError = require("http-errors");

const User = require("../models/User");

const {
  ERROR_UNREGISTERED_EMAIL,
  ERROR_WRONG_PASSWORD,
} = require("../constants/errorConstants");

router.get("/", function (req, res, next) {
  res.render("login");
});

router.post("/", async function (req, res, next) {
  try {
    const targetUser = await User.findOne({ email: req.body.email });

    if (!targetUser) {
      throw createError(401, ERROR_UNREGISTERED_EMAIL);
    }

    const isMatch = await targetUser.comparePassword(req.body.password);

    if (!isMatch) {
      throw createError(401, ERROR_WRONG_PASSWORD);
    }

    targetUser.generateToken();

    res
      .cookie("x_auth", targetUser.token)
      .redirect(302, "/");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
