const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/", function (req, res, next) {
  res.render("signup", { title: "바닐라코딩" });
});

router.post("/", function (req, res, next) {
  const user = new User(req.body);

  try {
    user.save();

    return res.redirect(302, "/login");
  } catch (err) {

    return next({ status: 400, message: "Failed to save user Information" });
  }
});

module.exports = router;
