const express = require("express");
const router = express.Router();

const mainRoute = require("./mainRoutes");
const linkRoute = require("./linkRoutes");
const profileLinkRoute = require("./profileLinkRoutes");
const qrCodeRoute = require("./qrCodeRoutes");

router.use("/", mainRoute);
router.use("/api/v1/link", linkRoute);
router.use("/api/v1/profilelink", profileLinkRoute);
router.use("/api/v1/qrcode", qrCodeRoute);

module.exports = router;
