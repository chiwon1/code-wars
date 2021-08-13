const User = require("../../models/User");

const auth = async function (req, res, next) {
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
    return res.redirect(302, "/login");
  }
};

module.exports = auth;
