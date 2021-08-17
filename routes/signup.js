const express = require("express");
const router = express.Router();

const validator = require("email-validator");

const User = require("../models/User");
const { ERROR_INVALID_SIGNUP_INPUT, ERROR_DUPLICATE_EMAIL } = require("../constants/errorConstants");

router.get("/", function (req, res, next) {
  res.render("signup");
});

router.post("/", function (req, res, next) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw createError(400, ERROR_INVALID_SIGNUP_INPUT);
    }

    if (!name.trim()) {
      throw createError(400, ERROR_INVALID_SIGNUP_INPUT);
    }

    if (!validator.validate(email)) {
      throw createError(400, ERROR_INVALID_SIGNUP_INPUT);
    }

    const user = new User(req.body);

    user.save();

    return res.redirect(302, "/login");
  } catch (err) {
    if (err.name === "MongoError" && err.code === 11000) {
      return next(createError(400, ERROR_DUPLICATE_EMAIL));
    }

    if (err instanceof mongoose.Error.ValidationError) {
      return next(createError(400, ERROR_INVALID_SIGNUP_INPUT));
    }

    next(err);
  }
});

module.exports = router;
