const { ethers } = require('ethers');

// Generate a random Ethereum wallet
exports.generateRandomWallet = () => {
  const wallet = ethers.Wallet.createRandom();
  return {
    publicKey: wallet.address,
    privateKey: wallet.privateKey,
    mnemonic: wallet.mnemonic.phrase,
  };
};
