const app = require("express");
const router = app.Router();
const { isLoggedIn, } = require("../middlewares/logged");
const {
  lendingPageController,
  userCreationsController,
  userDashboardController,
  userLoginPageController,
  userLoginController,
  userLogoutController,
  redirectLoginController,
} = require("../controllers/index-controller");

router.get("/", lendingPageController);
router.post("/register", userCreationsController);
router.get("/login", userLoginPageController);
router.post("/login", userLoginController);
router.get("/logout", userLogoutController);
router.get("/dashboard", isLoggedIn, userDashboardController);
router.get("*", redirectLoginController);

module.exports = router;
