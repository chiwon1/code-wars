const express = require("express");
const router = express.Router();
const auth = require("./middlewares/auth");
const User = require("../models/User");

router.get("/", auth, (req, res, next) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err) => {
    if (err) {
      return next({ status: 400, message: "Failed to find the user" });
    }

    return res
      .status(200)
      .send({ success: true });
  });
});

module.exports = router;
