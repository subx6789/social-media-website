const express = require("express");
const { registerUser, loginUser, sendOtp, verifyOtp } = require("../controllers/authController");
const { registerSchema, loginSchema, sendOtpSchema } = require("../schema/userSchema");
const validate = require("../middleware/validate");

const router = express.Router();

router.post("/register", validate(registerSchema), registerUser);
router.post("/login", validate(loginSchema), loginUser);
router.post("/send-otp", validate(sendOtpSchema), sendOtp);
router.post("/verify-otp", verifyOtp);

module.exports = router;
