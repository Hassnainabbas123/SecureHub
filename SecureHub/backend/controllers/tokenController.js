const User = require('../models/user'); // User model for MongoDB (example)
const walletProvider = require('../utils/walletProvider'); // Import the WalletProvider instance
require('dotenv').config();
const { ethers, parseUnits , formatUnits , toNumber} = require("ethers");

const tokenContract = walletProvider.getTokenContract();

class TokenController {
  constructor() {
  }

  // Mint tokens (admin only)
  async mintTokens(req, res) {
    const { to, amount } = req.body;
    
    try {
      if (!to || !amount) {
        return res.status(400).json({ error: "Recipient address and amount are required" });
      }

      // Mint the tokens
      const tx = await walletProvider.getTokenContract().mint(to, parseUnits(amount.toString()));
      await tx.wait();

      res.status(200).json({ message: 'Tokens minted successfully', transaction: tx });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Retrieve all transactions for admin
  async getTransactions(req, res) {
    try {
      const filter = tokenContract.filters.TokenTransaction();
      const events = await tokenContract.queryFilter(filter);

      const formattedEvents = events.map(event => {
        return {
          transactionHash: event.transactionHash, // Transaction hash
          blockNumber: event.blockNumber,        // Block number
          timestamp: toNumber(event.args.timestamp),        // Block timestamp (if available)
          user: event.args.user,                  // Sender address
          amount: formatUnits(event.args.amount, 18), // Amount (converted from Wei to Ether)
          action: event.args.action,              // Action (if applicable)
        };
      });

      res.status(200).json({ transactions: formattedEvents });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Check user token balance
// Check user token balance
async getTokenBalance(req, res) {
  const { email } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'User not found' });

    // Ensure publicKey exists
    const userAddress = user.wallet.publicKey;
    if (!userAddress) return res.status(400).json({ error: 'User wallet address not found' });

    // Fetch balance using balanceOf(address)
    const balance = await walletProvider.getTokenContract().balanceOf(userAddress);

    // Convert balance from BigNumber to readable format
    const formattedBalance = formatUnits(balance, 18);

    // Respond with the balance
    res.status(200).json({ balance: formattedBalance });
  } catch (error) {
    console.error('Error fetching token balance:', error.message);
    res.status(500).json({ error: error.message });
  }
}

  // Check if user has tokens for Digital Passport
  async checkTokenOwnership(req, res) {
    const { email } = req.body;

    console.log(email);

    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ error: 'User not found' });

      console.log(user.wallet.publicKey);

      const hasTokens = await tokenContract.hasTokens(user.wallet.publicKey);
      
      res.status(200).json({ hasTokens });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Transfer tokens (admin only)
  async transferTokens(req, res) {
    const { to, amount } = req.body;
    
    try {
      if (!to || !amount) {
        return res.status(400).json({ error: "Recipient address and amount are required" });
      }

      const tx = await tokenContract.transferTokens(to, parseUnits(amount.toString(), 18));
      await tx.wait();

      res.status(200).json({ message: 'Tokens transferred successfully', transaction: tx });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new TokenController();
