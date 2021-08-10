const express = require("express");
const path = require("path");
require("dotenv").config();

const index = require("./routes/index");
const login = require("./routes/login");
const register = require("./routes/register");
const connectMongoDB = require("./config/db");
const cookieParser = require("cookie-parser");

const app = express();

connectMongoDB();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/", index);
app.use("/register", register);
app.use("/login", login);
// app.use("/problems/", problems);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
