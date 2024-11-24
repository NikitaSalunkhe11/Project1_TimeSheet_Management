// auth.route.js

const { register, login, userVerify } = require('../controller/auth.controller'); // Adjust the path as per your project structure
const express = require('express');
const verifyUser  = require('../middleware/authmiddleware');
const router = express.Router();

// Define your routes
router.post('/register', register); // Assuming register is the callback function
router.post('/login', login) // Assuming is the callback function.
router.post("/verify", verifyUser, userVerify);

module.exports = router;
