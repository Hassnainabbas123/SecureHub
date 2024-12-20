const express = require("express");
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");
const Proposal = require("../models/Proposal");
const Comment = require("../models/Comment");
const User = require("../models/user"); // Import User model

const router = express.Router();

// JWT secret key
const JWT_SECRET = "MuhammadSabihUlHassan";

// Serve static files from the 'uploads' folder
router.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Multer configuration for PDF uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (path.extname(file.originalname) !== ".pdf") {
      return cb(new Error("Only PDFs are allowed"));
    }
    cb(null, true);
  },
});

// Middleware: Authenticate User via JWT and Email
const authenticateUser = async (req, res, next) => {
  const token = req.header("authToken") || req.headers["authorization"]?.split(" ")[1];
  const { email } = req.body;

  if (!token) return res.status(401).json({ error: "Authorization required" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.user;

    // Verify email belongs to a registered user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid or unregistered email" });

    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

// Route: Fetch all proposals
router.get("/proposals", async (req, res) => {
  try {
    const proposals = await Proposal.find();
    res.status(200).json({ proposals });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch proposals" });
  }
});

// Route: Fetch user's proposals
router.get("/my-proposals", authenticateUser, async (req, res) => {
  try {
    const proposals = await Proposal.find({ userId: req.user.id });
    res.json({ success: true, proposals });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user proposals" });
  }
});

// Route: Submit a new proposal
router.post("/submitProposal", authenticateUser, upload.single("pdf"), async (req, res) => {
  const { title, plotSize, plotLocation } = req.body;
  const pdf = req.file?.path;

  if (!title || !plotSize || !plotLocation || !pdf) {
    return res.status(400).json({ error: "All fields are required: title, plot size, plot location, and PDF" });
  }

  try {
    const newProposal = new Proposal({
      userId: req.user.id,
      title,
      plotSize,
      plotLocation,
      pdf,
    });

    await newProposal.save();
    res.json({ success: true, proposal: newProposal });
  } catch (error) {
    res.status(500).json({ error: "Failed to submit proposal" });
  }
});

// Route: Fetch user-commented proposals
router.get("/user-comments", authenticateUser, async (req, res) => {
  try {
    const comments = await Comment.find({ userId: req.user.id }).select("proposalId");
    const commentedProposals = comments.map((comment) => comment.proposalId);
    res.status(200).json({ success: true, commentedProposals });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user comments" });
  }
});

// Route: Add a comment to a proposal
router.post("/comment/:proposalId", authenticateUser, upload.single("pdf"), async (req, res) => {
  const { proposalId } = req.params;
  const { text } = req.body;
  const pdfPath = req.file ? req.file.path : null;

  if (!text) return res.status(400).json({ error: "Comment text is required" });

  try {
    const proposal = await Proposal.findById(proposalId);
    if (!proposal) return res.status(404).json({ error: "Proposal not found" });

    const existingComment = await Comment.findOne({ proposalId, userId: req.user.id });
    if (existingComment) {
      return res.status(400).json({ error: "You have already commented on this proposal" });
    }

    const newComment = new Comment({
      proposalId,
      userId: req.user.id,
      text,
      pdf: pdfPath,
    });

    await newComment.save();
    res.status(200).json({ success: true, message: "Comment added successfully", comment: newComment });
  } catch (error) {
    res.status(500).json({ error: "Failed to add comment" });
  }
});

module.exports = router;
