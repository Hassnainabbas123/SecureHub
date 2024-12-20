const { validationResult, body } = require('express-validator');
const User = require('../models/user');
const { encryptPassword, comparePassword } = require('../utils/cryptoUtils');
const { sendOtpEmail } = require('../utils/emailUtils'); // Function to send OTP email
require('dotenv').config();

class AuthController {
  // Register a new user
  static async registerUser(req, res) {
    // Validate input fields
    await body('name')
      .notEmpty()
      .withMessage('Name is required')
      .run(req);
    await body('email')
      .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/)
      .withMessage('Email must be a valid address and end with .com')
      .run(req);
    await body('password')
      .isLength({ min: 3 })
      .withMessage('Password must be at least 3 characters')
      .run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, email, password } = req.body;

      // Check if the email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already registered' });
      }

      // Encrypt the password
      const encryptedPassword = await encryptPassword(password);

      // Generate OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      // Create a new user
      const newUser = new User({
        name,
        email,
        password: encryptedPassword,
        otp,
      });

      await newUser.save();

      // Send OTP to the user's email
      await sendOtpEmail(email, otp);

      res.status(201).json({ message: 'User registered successfully. OTP sent to your email.' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Verify OTP
  static async verifyOtp(req, res) {
    const { email, otp } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      if (user.otp !== otp) {
        return res.status(400).json({ error: 'Invalid OTP' });
      }

      // Mark user as verified and clear OTP
      user.isVerified = true;
      user.otp = null;
      await user.save();

      res.status(200).json({ message: 'OTP verified successfully. User is now verified.' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Sign in user with email and password
  static async signInUser(req, res) {
    // Validate input fields
    await body('email')
      .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/)
      .withMessage('Email must be a valid address and end with .com')
      .run(req);
    await body('password')
      .notEmpty()
      .withMessage('Password is required')
      .run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }

      const isPasswordValid = await comparePassword(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ error: 'Invalid password' });
      }

      res.status(200).json({ message: 'Sign-in successful', user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = AuthController;
