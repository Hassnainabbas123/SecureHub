const mongoose = require("mongoose");

const PollSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: [
    {
      text: {
        type: String,
        required: true,
      },
      votes: {
        type: Number,
        default: 0,
      },
    },
  ],
  votedEmails: {
    type: [String],
    default: [],
  },
});

module.exports = mongoose.model("Poll", PollSchema);