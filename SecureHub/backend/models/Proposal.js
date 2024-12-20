const mongoose = require('mongoose');

const ProposalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  plotSize: {
    type: String,
    required: true
  },
  plotLocation: {
    type: String,
    required: true
  },
  pdf: {
    type: String, // Store the path to the uploaded PDF
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Proposal', ProposalSchema);
