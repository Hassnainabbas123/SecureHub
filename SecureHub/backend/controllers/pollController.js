const mongoose = require("mongoose");
const Poll = require("../models/Poll");
const User = require("../models/user"); // Import the User model

exports.voteOnPoll = async (req, res) => {
  const pollId = req.params.id;
  const { selectedOption, email } = req.body;

  if (!mongoose.Types.ObjectId.isValid(pollId)) {
    return res.status(400).json({ error: "Invalid poll ID" });
  }

  try {
    // Verify the email belongs to a registered user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Email is not associated with a registered user" });
    }

    const poll = await Poll.findById(pollId);
    if (!poll) {
      return res.status(404).json({ error: "Poll not found" });
    }

    // Check if the email has already voted
    if (poll.votedEmails.includes(email)) {
      return res.status(400).json({ error: "You have already voted on this poll" });
    }

    // Find the selected option
    const option = poll.options.find((opt) => opt.text === selectedOption);
    if (!option) {
      return res.status(400).json({ error: "Invalid option selected" });
    }

    // Increment the vote count and add email to the votedEmails array
    option.votes += 1;
    poll.votedEmails.push(email);
    await poll.save();

    res.json({ success: true, message: "Vote cast successfully", updatedPoll: poll });
  } catch (error) {
    console.error("Error while casting vote:", error);
    res.status(500).json({ error: "Failed to cast vote" });
  }
};



exports.createPoll = async (req, res) => {
  const { question, options } = req.body;

  if (!question || !Array.isArray(options) || options.length < 2) {
    return res.status(400).json({ error: "Question and at least 2 options are required." });
  }

  try {
    const newPoll = new Poll({
      question,
      options: options.map((option) => ({ text: option, votes: 0 })),
    });

    await newPoll.save();
    res.json({ success: true, poll: newPoll });
  } catch (error) {
    res.status(500).json({ error: "Server error while creating poll." });
  }
};

exports.getAllPolls = async (req, res) => {
  try {
    const polls = await Poll.find();
    res.json({ success: true, polls });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch polls" });
  }
};
