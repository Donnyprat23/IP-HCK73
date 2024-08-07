const express = require("express");
const app = express();
const router = require("./routers/router");
const cors = require("cors");
// const app = require("../app.js");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/", router);

module.exports = app;
