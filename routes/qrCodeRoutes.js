const express = require("express");
const router = express.Router();
const qrCodeController = require("../app/controllers/qrCodeControllers");
const userMiddleware = require("../middlewares/userMiddleware");

router.get("/", userMiddleware.authorize, qrCodeController.getAll);
router.get("/:id", userMiddleware.authorize, qrCodeController.getById);
router.post("/", userMiddleware.authorize, qrCodeController.create);
router.put("/:id", userMiddleware.authorize, qrCodeController.update);
router.delete("/:id", userMiddleware.authorize, qrCodeController.deleteById);

module.exports = router;
