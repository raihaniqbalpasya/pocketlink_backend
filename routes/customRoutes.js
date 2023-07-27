const express = require("express");
const router = express.Router();
const customController = require("../app/controllers/customControllers");
const userMiddleware = require("../middlewares/userMiddleware");

router.get("/", userMiddleware.authorize, customController.getAll);
router.get("/:id", userMiddleware.authorize, customController.getById);
router.post("/", userMiddleware.authorize, customController.create);
router.put("/:id", userMiddleware.authorize, customController.update);
router.delete(
  "/:id",
  userMiddleware.authorize,
  customController.deleteById
);

module.exports = router;
