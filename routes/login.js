const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/", (req, res, next) => {
  res.render("login", { title: "바닐라코딩" });
});

router.post("/", (req, res, next) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (user === undefined) {
      return res
        .json({
          loginSuccess: false,
          message: "Invalid email",
        });
    }

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (isMatch === false) {
        return res
          .json({ loginSuccess: false, message: "Wrong password" });
      }

      user.generateToken((err, user) => {
        if (err) {
          return next({ status: 400, message: "Failed to generate token" });
        }

        res
          .cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id });
      });
    });
  });
});

module.exports = router;
