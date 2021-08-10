const express = require("express");
const router = express.Router();
const auth = require("./middlewares/auth");

router.get("/", auth, (req, res, next) => {
  res
    .status(200)
    .json({
      _id: req.user._id,
      isAuth: true,
      email: req.user.email,
      name: req.user.name,
    });
});

module.exports = router;
