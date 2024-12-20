const { validationResult, body } = require('express-validator');
const User = require('../models/user');
const { generateRandomWallet } = require('../utils/walletUtils');

class WalletController {
  // Generate a random wallet and update the user's record
  static async createRandomWallet(req, res) {
    // Validate input fields
    await body('email').isEmail().withMessage('Email is invalid').run(req);
    console.log(req.body);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email } = req.body; // Assuming email is used for user identification
      // console.log(email);
      // Check if the user exists
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ error: 'User not found' });

   
      if (user.hasOwnProperty('wallet')) {
        return res.status(400).json({ error: 'User already has a wallet' });
      }

      // Generate a random Ethereum wallet
      const wallet = generateRandomWallet();

      // Update the user with the generated wallet details
      user.wallet = wallet;
      await user.save();

      res.status(200).json({ message: 'Wallet created successfully', wallet });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = WalletController;
