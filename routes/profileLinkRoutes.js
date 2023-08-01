const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const profileLinkController = require("../app/controllers/profileLinkControllers");
const userMiddleware = require("../middlewares/userMiddleware");

router.get("/", userMiddleware.authorize, profileLinkController.getAll);
router.get("/:id", userMiddleware.authorize, profileLinkController.getById);
router.get("/search/by", profileLinkController.searchByProfileLink);
router.get(
  "/my/profile",
  userMiddleware.authorize,
  profileLinkController.getMyProfile
);
router.post("/", userMiddleware.authorize, profileLinkController.create);
router.put(
  "/",
  userMiddleware.authorize,
  upload.single("profilePic"),
  profileLinkController.updateMyProfile
);
router.delete(
  "/:id",
  userMiddleware.authorize,
  profileLinkController.deleteById
);

module.exports = router;
