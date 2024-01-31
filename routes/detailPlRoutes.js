const express = require("express");
const router = express.Router();
const detailPlController = require("../app/controllers/detailPlControllers");
const userMiddleware = require("../middlewares/userMiddleware");
const upload = require("../config/multer");

router.get("/", userMiddleware.authorize, detailPlController.getAll);
router.get("/:id", userMiddleware.authorize, detailPlController.getById);
router.post(
  "/",
  userMiddleware.authorize,
  upload.single("image"),
  detailPlController.create
);
router.put(
  "/:id",
  userMiddleware.authorize,
  upload.single("image"),
  detailPlController.update
);
router.delete("/:id", userMiddleware.authorize, detailPlController.deleteById);

module.exports = router;
