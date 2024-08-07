require("dotenv").config();
const { User } = require("../models");
const { comparePassword } = require("../helpers/bcrypt.js");
const { signToken } = require("../helpers/jwt.js");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();
const jwt = require("jsonwebtoken")

class UserController {
  static async registerUser(req, res, next) {
    try {
      const { username, email, password } = req.body;
      const createdUser = await User.create({
        username,
        email,
        password,
      });

      res.status(201).json({
        msg: `berhasil register dengan id dan email ${createdUser.email}`,
      });
    } catch (error) {
      // next(error);
      console.log(error);
    }
  }

  static async loginUser(req, res, next) {
    const { email, password } = req.body;
    try {
      if (!email) {
        throw { name: "invalid email/password" };
      }

      if (!password) {
        throw { name: "invalid email/password" };
      }
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw { name: "Invalid user" };
      }
      const isPasswordValid = comparePassword(password, user.password);
      if (!isPasswordValid) {
        throw { name: "Invalid user" };
      }

      const access_token = signToken({ userId: user.id });

      res.status(200).json({ access_token });
    } catch (error) {
      // next(error);
      console.log(error);
    }
  }
  static async googleLogin(req,res,next) {
    const { email, googleToken } = req.body;
    try {
      const ticket = await client.verifyIdToken({
        idToken: googleToken,
        audience: process.env.GOOGLE_CLIENT_ID,
        // audience: "407408718192.apps.googleusercontent.com",
      });
      const payload = ticket.getPayload();
      const [user, created] = await User.findOrCreate({
        where: { email },
        defaults: {
          username: payload.name,
          email: payload.email,
          picture: payload.picture,
          provider: "google",
          password: "google_id",
        },
        hooks: false,
      });

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
      res.status(created ? 201 : 200).json({ access_token: token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = UserController;
