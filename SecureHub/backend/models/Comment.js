// models/Comment.js
const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema(
  {
    proposalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Proposal',
      required: true,
    },
    userId: {
      type:mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    pdf: {
      type: String, // Path to the uploaded PDF file
    },
    thumbs: {
      type: Number,
      default: 0, // Initialize thumbs count
    },
    date: {
      type: Date,
      default: Date.now,
    },
    thumbedBy: { type: [mongoose.Schema.Types.ObjectId], default: [] },
  },
  
  { timestamps: true }
);

module.exports = mongoose.model('Comment', CommentSchema);
