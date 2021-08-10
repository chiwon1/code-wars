const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/", (req, res, next) => {
  res.render("register", { title: "바닐라코딩" });
});

router.post("/", (req, res, next) => {
  const user = new User(req.body);

  user.save((err) => {
    if (err) {
      console.log("err", err);
      return next({ status: 400, message: "Failed to save user Information" });
    }

    return res
      .status(200)
      .json({ success: true });
  });
});

module.exports = router;
