const express = require("express");

const router = express.Router();

const authController = require("../../controllers/auth");
const { controllerWrapper } = require("../../helpers");
const {authMiddleware} = require("../../middlewares")

router.post("/signup", controllerWrapper(authController.signup));

router.post("/login", controllerWrapper(authController.login));

router.get("/logout", authMiddleware, controllerWrapper(authController.logout));

router.get("/current", authMiddleware, controllerWrapper(authController.getCurrentUser))

module.exports = router;
