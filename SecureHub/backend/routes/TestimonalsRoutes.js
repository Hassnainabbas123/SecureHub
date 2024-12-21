
const express = require('express');
const router = express.Router();
const Testimonial = require('../models/testimonals');

// Get all testimonials
router.get('/testimonials', async (req, res) => {
  try {
    const testimonials = await Testimonial.find();
    res.status(200).json(testimonials);
  } catch (error) {
    res.status(500).json({ message: "Error fetching testimonials", error: error.message });
  }
});

// Create a new testimonial
router.post('/testimonials', async (req, res) => {
  const { name, role, message } = req.body;

  try {
    const newTestimonial = new Testimonial({
      name,
      role,
      message,
    });

    const savedTestimonial = await newTestimonial.save();
    res.status(201).json(savedTestimonial);
  } catch (error) {
    res.status(500).json({ message: "Error creating testimonial", error: error.message });
  }
});

module.exports = router;