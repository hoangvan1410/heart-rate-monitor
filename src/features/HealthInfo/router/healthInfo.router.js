const express = require("express");
const router = express.Router();
const controller = require("../controllers/healthInfo.controller.js");

router.post("/get", controller.getHealthInfo);
router.post("/update", controller.updateHealthInfo);

module.exports = router;