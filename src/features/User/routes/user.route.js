const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.controller.js");

router.post("/signup", controller.signup);

router.post("/login", controller.login);

router.post("/otp", controller.otp);

router.post("/resendOTP", controller.resendOTP);

router.post("/forgotpw", controller.forgotPW);

module.exports = router;
