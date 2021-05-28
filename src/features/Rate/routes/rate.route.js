const express = require("express");
const router = express.Router();
const controller = require("../controllers/rate.controller.js");

router.post("/", controller.index);

router.post("/arr", controller.postArr);

module.exports = router;
