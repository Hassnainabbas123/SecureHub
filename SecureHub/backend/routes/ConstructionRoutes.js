const express = require("express");
const router = express.Router();
const {
  getAllProposals,
  getUserProposals,
  submitProposal,
  getUserComments,
  commentOnProposal,
} = require("../controllers/constructionController");

// Get all proposals
router.get("/all", getAllProposals);

// Get proposals submitted by the logged-in user
router.get("/my-proposals", getUserProposals);

// Submit a new proposal
router.post("/submit", submitProposal);

// Get proposals where the user has commented
router.get("/my-comments", getUserComments);

// Add a comment to a proposal
router.post("/comment/:proposalId", commentOnProposal);

module.exports = router;
