const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require("../models/User");

const { ERROR_INVALID_USER_ID } = require("../constants/errorConstants");

router.get("/", function (req, res, next) {
  res.redirect(302, "/login");
});

router.post("/", async function (req, res, next) {
  try {
    const _id = req.user._id;

    if (!mongoose.isValidObjectId(_id)) {
      next(createError(400, ERROR_INVALID_USER_ID));
    }

    await User.findOneAndUpdate({ _id }, { token: "" });

    res.redirect(302, "/login");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
