const express = require("express");
const router = express.Router();

const mainRoute = require("./mainRoutes");
const linkRoute = require("./linkRoutes");
const profileLinkRoute = require("./profileLinkRoutes");
const customRoute = require("./customRoutes");

router.use("/", mainRoute);
router.use("/api/v1/link", linkRoute);
router.use("/api/v1/profilelink", profileLinkRoute);
router.use("/api/v1/custom", customRoute);

module.exports = router;
