const express = require("express");

const router = express.Router();

const authController = require("../../controllers/auth");
const { controllerWrapper } = require("../../helpers");

router.post("/signup", controllerWrapper(authController.signup));
router.post("/login", controllerWrapper(authController.login));

module.exports = router;
