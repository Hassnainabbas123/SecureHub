const express = require("express");
const router = express.Router();
const { createPoll, getAllPolls, voteOnPoll } = require("../controllers/pollController");

// Create Poll
router.post("/createpoll", createPoll);

// Get All Polls
router.get("/getpolls", getAllPolls);

// Vote on a Poll
router.post("/vote/:id", voteOnPoll);

module.exports = router;
