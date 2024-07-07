const app = require("express");
const router = app.Router();
const { lendingPageController, userCreationsController, userDashboardController, userLoginPageController, userLoginController, userLogoutController } = require("../controllers/index-controller");

router.get("/", lendingPageController);
router.post("/register", userCreationsController);
router.get("/login", userLoginPageController);
router.post("/login", userLoginController);
router.get("/logout", userLogoutController);

router.get("/dashboard", userDashboardController);

module.exports = router;