const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

async function isAuthenticate(req, res, next) {
  try {
    let access_token = req.headers.authorization;
    if (!access_token) {
      throw { name: "invalid-token" };
    }
    let [Bearer, token] = access_token.split(" ");
    if (Bearer !== "Bearer") {
      throw { name: "invalid-token" };
    }

    let payload = verifyToken(token);
    let user = await User.findByPk(payload.userId);
    if (!user) {
      throw { name: "invalid-token" };
    }
    req.user = {
      id: user.id,
    };
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = isAuthenticate;
