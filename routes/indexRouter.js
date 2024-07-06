const app = require("express");
const router = app.Router();
const { lendingPageController, userCreationsController } = require("../controllers/index-controller");

router.get("/", lendingPageController);
router.post("/register", userCreationsController);

module.exports = router;