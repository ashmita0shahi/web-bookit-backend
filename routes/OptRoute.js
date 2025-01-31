const express = require("express");
const { sendOtp, registerUser } = require("../controller/UserController");

const router = express.Router();

router.post("/register/send-otp", sendOtp); // Step 1: Send OTP
router.post("/register", registerUser); // Step 2: Verify OTP and Register

module.exports = router;
