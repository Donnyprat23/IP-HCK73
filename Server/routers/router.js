const router = require("express").Router();
const UserController = require("../controllers/User_Controller");
const NewsController = require("../controllers/News_Controller");

router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser);
router.post("/auth/google", UserController.googleLogin);

router.get("/home", NewsController.ShowAllNews);

module.exports = router;
