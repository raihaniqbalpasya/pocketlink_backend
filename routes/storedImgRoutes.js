const express = require("express");
const router = express.Router();
const storedImgController = require("../app/controllers/storedImgControllers");
const userMiddleware = require("../middlewares/userMiddleware");

router.get("/", userMiddleware.authorize, storedImgController.getAll);
router.get("/:id", userMiddleware.authorize, storedImgController.getById);
router.get("/", userMiddleware.authorize, storedImgController.getByUserId);
router.delete("/:id", userMiddleware.authorize, storedImgController.deleteById);

module.exports = router;
