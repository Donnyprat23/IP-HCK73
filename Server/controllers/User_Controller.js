require("dotenv").config();
const { User } = require("../models");
const { comparePassword } = require("../helpers/bcrypt.js");
const { signToken } = require("../helpers/jwt.js");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();
const jwt = require("jsonwebtoken");
const { where } = require("sequelize");

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
      next(error);
      // console.log(error);
    }
  }

  static async loginUser(req, res, next) {
    const { email, password } = req.body;
    console.log(req.body, "ini req body");
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
      console.log(password);
      if (!isPasswordValid) {
        throw { name: "Invalid user" };
      }

      const access_token = signToken({ userId: user.id });
      res.status(200).json({ access_token });
    } catch (error) {
      next(error);
      // res.send(error.message);
    }
  }
  static async googleLogin(req, res, next) {
    const { email, googleToken } = req.body;
    try {
      const ticket = await client.verifyIdToken({
        idToken: googleToken,
        audience: process.env.GOOGLE_CLIENT_ID,
        // audience: "407408718192.apps.googleusercontent.com",
      });
      const payload = ticket.getPayload();
      const [user, created] = await User.findOrCreate({
        where: { email: payload.email },
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
      // next(error);
      console.log(error);
    }
  }

  static async getUser(req, res, next) {
    const { id } = req.user;
    try {
      let findUser = await User.findByPk(+id);
      res.status(200).json(findUser);
    } catch (error) {
      next(error);
    }
  }
  static async EditProfile(req, res, next) {
    const { id } = req.user;
    const { username, email } = req.body;
    try {
      const updateProfile = await User.update(
        {
          username,
          email,
        },
        {
          where: { id },
        }
      );
      res.status(200).json({
        message: `Successfully Update Profile`,
      });
    } catch (error) {
      next(error);
    }
  }
  static async DeleteProfile(req, res, next) {
    const { id } = req.user;
    try {
      const DeleteProfile = await User.destroy({
        where: { id },
      });
      res.status(200).json({
        message: `Successfully Delete Profile`,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
