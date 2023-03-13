const express = require("express");

const router = express.Router();

const authController = require("../../controllers/auth");
const { controllerWrapper } = require("../../helpers");
const { authMiddleware, upload } = require("../../middlewares");

router.post("/signup", controllerWrapper(authController.signup));

router.post("/login", controllerWrapper(authController.login));

router.get("/logout", authMiddleware, controllerWrapper(authController.logout));

router.get(
  "/current",
  authMiddleware,
  controllerWrapper(authController.getCurrentUser)
);

router.patch("/avatars", authMiddleware, upload.single("avatar"), controllerWrapper(authController.updateAvatar));

module.exports = router;
