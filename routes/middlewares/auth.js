const User = require("../../models/User");

const auth = (req, res, next) => {
  const token = req.cookies.x_auth;

  User.findByToken(token, (err, user) => {
    if (err) {
      // return res.redirect(302, "/login");
      next({ status: 400, message: "Invalid token" });
    }

    if (user === undefined) {
      return res
        // .redirect(302, "/login")
        .json({ status: 400, message: "Invalid user" });
    }

    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = auth;
