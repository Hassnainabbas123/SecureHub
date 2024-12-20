const express = require("express");
const router = express.Router();
const { getStripekey } = require("../controllers/stripeController");

// Create Poll
router.post("/create-payment-intent", getStripekey);


module.exports = router;


