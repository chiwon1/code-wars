const User = require("../../models/User");

const auth = (req, res, next) => {
  const token = req.cookies.x_auth;

  User.findByToken(token, (err, user) => {
    if (err) {
      return res.redirect(302, "/login");
    }

    if (!user) {
      return res.redirect(302, "/login");
    }

    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = auth;
