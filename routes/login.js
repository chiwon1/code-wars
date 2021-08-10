const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("login", { title: "바닐라코딩" });
});

// router.post("/", (req, res, next) => {
//   USERS.push(req.body);

//   res
//     .status(201)
//     .json(USERS);
// });

module.exports = router;
