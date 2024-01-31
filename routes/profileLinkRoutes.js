const express = require("express");
const router = express.Router();
const profileLinkController = require("../app/controllers/profileLinkControllers");
const userMiddleware = require("../middlewares/userMiddleware");
const upload = require("../config/multer");

router.get("/", userMiddleware.authorize, profileLinkController.getAll);
router.get("/:id", userMiddleware.authorize, profileLinkController.getById);
// router.get("/search/by", profileLinkController.searchByProfileLink); // Sementara gak dipakai
router.get(
  "/my/profile",
  userMiddleware.authorize,
  profileLinkController.getMyProfile
);
router.post(
  "/",
  userMiddleware.authorize,
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "backgroundImage", maxCount: 1 },
  ]),
  profileLinkController.create
);
router.put(
  "/",
  userMiddleware.authorize,
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "backgroundImage", maxCount: 1 },
  ]),
  profileLinkController.updateMyProfile
);
router.delete(
  "/:id",
  userMiddleware.authorize,
  profileLinkController.deleteMyProfile
);

module.exports = router;
