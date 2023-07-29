const express = require("express");
const router = express.Router();
const linkController = require("../app/controllers/linkControllers");
const userMiddleware = require("../middlewares/userMiddleware");

router.get("/", userMiddleware.authorize, linkController.getAll);
router.get("/me", userMiddleware.authorize, linkController.getAllByUserId);
router.get("/:id", userMiddleware.authorize, linkController.getById);
router.get(
  "/search/by",
  userMiddleware.authorize,
  linkController.searchByCustomLink
);
router.post("/", userMiddleware.authorize, linkController.create);
router.put("/:id", userMiddleware.authorize, linkController.update);
router.delete("/:id", userMiddleware.authorize, linkController.deleteById);

module.exports = router;
