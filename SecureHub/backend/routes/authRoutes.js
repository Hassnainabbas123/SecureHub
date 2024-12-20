const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');

// Register a new user
router.post('/register', AuthController.registerUser);

// Sign-in user
router.post('/signin', AuthController.signInUser);


router.post('/verify-otp', AuthController.verifyOtp);



module.exports = router;
