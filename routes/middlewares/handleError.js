const handleError = function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);

  if (req.headers["content-type"] === "application/json") {
    res.json({ error: res.locals.message });
  } else {
    res.render("error");
  }
}

module.exports = handleError;
