const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
  walletaddress: { type: String, required: true },
  userType: { type: String, required: true },
});

const walletmodel = mongoose.model('wallet', walletSchema);
module.exports = walletmodel;
