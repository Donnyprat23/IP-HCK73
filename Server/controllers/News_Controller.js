const { User, News } = require("../models");
const { op } = require("sequelize");
const NewsApi = require("../helpers/NewsApi");
const axios = require("axios");
const openai = require("../helpers/Open_AI");

class NewsController {
  static async ShowAllNews(req, res, next) {
    try {
      let { data } = await NewsApi({
        url: `https://newsapi.org/v2/top-headlines?country=id&apiKey=7258674c8bc44dfd990383f0c1bcc7c7`,
        method: "GET",
      });
      console.log(data);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  }

  static async addNews(req, res, next) {
    try {
    } catch (error) {}
  }

  static async searchAi(req, res, next) {
    try {
      let { search } = req.body;
      let responsAI = await openai(search);
      const jsonResponse = JSON.parse(responsAI);
      console.log(search);
      res.status(200).json({ response: jsonResponse });
      // res.send(responsAI);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = NewsController;
