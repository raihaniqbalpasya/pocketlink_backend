const express = require("express");
const router = express.Router();

const mainRoute = require("./mainRoutes");
const linkRoute = require("./linkRoutes");
const profileLinkRoute = require("./profileLinkRoutes");
const qrCodeRoute = require("./qrCodeRoutes");
const detailPlRoute = require("./detailPlRoutes");
const storedImgRoute = require("./storedImgRoutes");

router.use("/", mainRoute);
router.use("/api/v1/link", linkRoute);
router.use("/api/v1/profilelink", profileLinkRoute);
router.use("/api/v1/qrcode", qrCodeRoute);
router.use("/api/v1/details", detailPlRoute);
router.use("/api/v1/imgstorage", storedImgRoute);

module.exports = router;
