const app = require("express");
const router = app.Router();
const { lendingPageController } = require("../controllers/index-controller");

router.get("/", lendingPageController);

module.exports = router;