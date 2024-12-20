const express = require('express');
const router = express.Router();
const WalletController = require('../controllers/walletController');

// Generate a random wallet
router.post('/create-wallet', WalletController.createRandomWallet);

module.exports = router;
