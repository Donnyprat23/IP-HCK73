const { User, News } = require("../models");
const { op } = require("sequelize");
const NewsApi = require("../helpers/NewsApi");
const axios = require("axios");

class NewsController {
  static async ShowAllNews(req, res, next) {
    try {
      let news = await NewsApi({
        url: `https://newsapi.org/v2/top-headlines?country=id&apiKey=7258674c8bc44dfd990383f0c1bcc7c7`,
        method: "GET",
      });
      console.log(news);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = NewsController;
