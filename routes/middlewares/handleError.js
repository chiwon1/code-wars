const { ERROR_500_SERVER } = require("../../constants/errorConstants");

function handleError(err, req, res, next) {
  if (!err.status) {
    res.locals.message = ERROR_500_SERVER;
  } else {
    res.locals.message = err.message;
  }

  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);

  if (req.headers["content-type"] === "application/json") {
    res.json({ error: res.locals.message });
  } else {
    res.render("error");
  }
}

module.exports = handleError;
