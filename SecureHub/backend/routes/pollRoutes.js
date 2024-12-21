const express = require("express");
const router = express.Router();
const { createPoll, getAllPolls, voteOnPoll, getPollsByUser } = require("../controllers/pollController");

// Create Poll
router.post("/createpoll", createPoll);

// Get All Polls
router.get("/getpolls", getAllPolls);

// Vote on a Poll
router.post("/vote/:id", voteOnPoll);

// Get Polls by Creator Email
router.get("/getPollsByUser/:email", getPollsByUser);


module.exports = router;
