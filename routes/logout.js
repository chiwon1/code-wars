const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/", async function (req, res, next) {
  await User.findOneAndUpdate({ _id: req.user._id }, { token: "" });

  return res.redirect(302, "/login");
});

module.exports = router;
