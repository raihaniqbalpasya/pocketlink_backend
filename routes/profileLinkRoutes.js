const express = require("express");
const router = express.Router();
const profileLinkController = require("../app/controllers/profileLinkControllers");
const userMiddleware = require("../middlewares/userMiddleware");

router.get("/", userMiddleware.authorize, profileLinkController.getAll);
router.get("/:id", userMiddleware.authorize, profileLinkController.getById);
router.get(
  "/my/profile",
  userMiddleware.authorize,
  profileLinkController.getMyProfile
);
router.get(
  "/search/by",
  userMiddleware.authorize,
  profileLinkController.searchByProfileLink
);
router.post("/", userMiddleware.authorize, profileLinkController.create);
router.put(
  "/",
  userMiddleware.authorize,
  profileLinkController.updateMyProfile
);
router.delete(
  "/:id",
  userMiddleware.authorize,
  profileLinkController.deleteById
);

module.exports = router;
