const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/", function (req, res, next) {
  res.render("login", { title: "바닐라코딩" });
});

router.post("/", async function (req, res, next) {
  const targetUser = await User.findOne({ email: req.body.email });

  if (!targetUser) {
    return res.json({ loginSuccess: false, message: "Invalid email" });
  }

  const isMatch = await targetUser.comparePassword(req.body.password);

  if (isMatch === false) {
    return res
      .json({ loginSuccess: false, message: "Wrong password" });
  }

  try {
    targetUser.generateToken();

    res
      .cookie("x_auth", targetUser.token)
      .redirect(302, "/");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
