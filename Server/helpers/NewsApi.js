const axios = require("axios");
const instance = axios.create({
  baseURL: "https://newsapi.org",
});

module.exports = instance;
