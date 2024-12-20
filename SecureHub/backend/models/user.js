const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  otp: { type: String }, // OTP for verification
  wallet: {
    publicKey: { type: String },
    privateKey: { type: String },
    mnemonic: { type: String },
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
