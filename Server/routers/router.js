const router = require("express").Router();
const UserController = require("../controllers/User_Controller");
const NewsController = require("../controllers/News_Controller");
const isAuthenticate = require("../middleware/isAuthenticate");

router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser);
router.post("/auth/google", UserController.googleLogin);
router.get("/user", isAuthenticate, UserController.getUser);
router.put("/editprofile", isAuthenticate, UserController.EditProfile);
router.delete("/deleteprofile", isAuthenticate, UserController.DeleteProfile);

router.post("/search", NewsController.searchAi);
router.get("/home", NewsController.ShowAllNews);

module.exports = router;
