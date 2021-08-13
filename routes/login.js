const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/", function (req, res, next) {
  res.render("login", { title: "바닐라코딩" });
});

router.post("/", async function (req, res, next) {
  const targetUser = await User.findOne({ email: req.body.email });

  if (!targetUser) {
    return res
        .json({
          loginSuccess: false,
          message: "Invalid email",
      });
  }

  // 아래 부분 async await 이용하여 변경필요
  targetUser.comparePassword(req.body.password, function (err, isMatch) {
    if (isMatch === false) {
      return res
        .json({
          loginSuccess: false,
          message: "Wrong password",
      });
    }

    targetUser.generateToken(function (err, user) {
      if (err) {
        res.redirect(302, "/");
        next({ status: 400, message: "Failed to generate token" });
      }

      res
        .cookie("x_auth", user.token)
        .redirect(302, "/");
    });
  });
});

module.exports = router;
