const Testimonial = require('../models/testimonialModel');

// Get all testimonials
exports.getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find();
    res.status(200).json(testimonials);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch testimonials', error });
  }
};

// Create a new testimonial
exports.createTestimonial = async (req, res) => {
  const { name, role, message } = req.body;

  if (!name || !role || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newTestimonial = new Testimonial({ name, role, message });
    const savedTestimonial = await newTestimonial.save();
    res.status(201).json(savedTestimonial);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create testimonial', error });
  }
};

// Get a single testimonial by ID
exports.getTestimonialById = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    res.status(200).json(testimonial);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch testimonial', error });
  }
};

// Update a testimonial
exports.updateTestimonial = async (req, res) => {
  const { name, role, message } = req.body;

  try {
    const updatedTestimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { name, role, message },
      { new: true }
    );

    if (!updatedTestimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }

    res.status(200).json(updatedTestimonial);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update testimonial', error });
  }
};

// Delete a testimonial
exports.deleteTestimonial = async (req, res) => {
  try {
    const deletedTestimonial = await Testimonial.findByIdAndDelete(req.params.id);

    if (!deletedTestimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }

    res.status(200).json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete testimonial', error });
  }
};
