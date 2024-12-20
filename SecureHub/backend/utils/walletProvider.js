const { ethers } = require("ethers");
require('dotenv').config();
const fs = require('fs');
const path = require('path');


// Load the ABI from the JSON file
const TokenContractABI = JSON.parse(fs.readFileSync(path.join(__dirname, '../abis/SecureEstate.json'), 'utf-8')).abi;
const rsContractABI = JSON.parse(fs.readFileSync(path.join(__dirname, '../abis/RealTok.json'), 'utf-8')).abi;


// Initialize the provider, wallet, and token contract
class WalletProvider {
  constructor() {
    this.provider = new ethers.JsonRpcProvider(process.env.HARDHAT_RPC_URL);
    this.wallet = new ethers.Wallet(process.env.ADMIN_PRIVATE_KEY, this.provider);
    this.tokenContract = new ethers.Contract(process.env.TOKEN_CONTRACT_ADDRESS, TokenContractABI, this.wallet);
    this.rsContract = new ethers.Contract(process.env.RS_CONTRACT_ADDRESS, rsContractABI, this.wallet);
  }

  getProvider() {
    console.log(this.provider);
    return this.provider;
  }

  getWallet() {
    console.log(this.wallet);
    return this.wallet;
  }

  getTokenContract() {
    console.log(this.tokenContract);
    return this.tokenContract;
  }

  getRSContract() {
    console.log(this.rsContract);
    return this.rsContract;
  }
}


const test = new WalletProvider();
test.getProvider();
test.getWallet();
test.getRSContract();
test.getTokenContract();


// Export a single instance of WalletProvider
module.exports = new WalletProvider();
