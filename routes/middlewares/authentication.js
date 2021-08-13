const User = require("../../models/User");

async function authentication(req, res, next) {
  const token = req.cookies.x_auth;

  try {
    const targetUser = await User.findByToken(token);

    if (!targetUser) {
      return res.redirect(302, "/login");
    }

    req.user = targetUser;
    req.token = token;

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authentication;
