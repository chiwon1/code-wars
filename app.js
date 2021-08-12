const express = require("express");
const path = require("path");
require("dotenv").config();

const index = require("./routes/index");
const signup = require("./routes/signup");
const login = require("./routes/login");
const logout = require("./routes/logout");
const problems = require("./routes/problems");

const connectMongoDB = require("./config/db");
const cookieParser = require("cookie-parser");

const auth = require("./routes/middlewares/auth");
const handleInvalidUrl = require("./routes/middlewares/handleInvalidUrl");
const handleError = require("./routes/middlewares/handleError");

const app = express();

connectMongoDB();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/signup", signup);
app.use("/login", login);
app.use("/", auth, index);
app.use("/logout", auth, logout);
app.use("/problems/", auth, problems);

app.use(handleInvalidUrl);
app.use(handleError);

module.exports = app;
