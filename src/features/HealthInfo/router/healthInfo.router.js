const express = require("express");
const router = express.Router();
const controller = require("../controllers/healthInfo.controller.js");
const verifyUser = require("../../Config/middleware/verifyUser");

router.post("/get",verifyUser, controller.getHealthInfo);
router.post("/update",verifyUser, controller.updateHealthInfo);

module.exports = router;