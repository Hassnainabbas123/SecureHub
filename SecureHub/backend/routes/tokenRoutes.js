const express = require('express');
const router = express.Router();
const TokenController = require('../controllers/tokenController');

// Middleware to check if the user is an admin
function isAdmin(req, res, next) {
//   const { isAdmin } = req.user;  // Assuming `req.user` contains user info, including admin status
//   if (!isAdmin) {
//     return res.status(403).json({ error: 'Permission denied, admin only' });
//   }
  next();
}

// Route to mint tokens (admin only)
router.post('/mint', isAdmin, TokenController.mintTokens);

// Route to get all transactions (admin only)
router.get('/transactions', isAdmin, TokenController.getTransactions);

// Route to check token balance (user-specific)
router.post('/balance', TokenController.getTokenBalance);

// Route to check if user owns tokens (for passport)
router.post('/check-ownership', TokenController.checkTokenOwnership);

// Route to transfer tokens (admin only)
router.post('/transfer', isAdmin, TokenController.transferTokens);

module.exports = router;
