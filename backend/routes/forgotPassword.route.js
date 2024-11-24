const express = require('express');
const {forgotPassword, verifyOtp, ChangePassword} = require('../controller/forgotPassword.controller');
const router = express.Router();

router.post('/forgot-password', forgotPassword)
router.post('/verify-otp', verifyOtp)
router.post('/change-password', ChangePassword)

module.exports = router;