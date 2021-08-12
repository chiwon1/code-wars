const handleInvalidUrl = (req, res, next) => {
  next({ status: 404, message: "404 Not Found" });
}

module.exports = handleInvalidUrl;
