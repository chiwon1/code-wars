const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/", (req, res, next) => {
  res.render("register", { title: "바닐라코딩" });
});

module.exports = router;
