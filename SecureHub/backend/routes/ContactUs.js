const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');  // Path to your Contact model

// Route to handle the contact form submission
router.post('/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    // Create a new contact entry
    const newContact = new Contact({
      name,
      email,
      subject,
      message,
    });

    // Save the entry to the database
    await newContact.save();

    // Respond with success message
    res.status(201).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error saving contact form:', error);
    res.status(500).json({ message: 'There was an error saving your message.' });
  }
});

// Route to fetch all feedbacks
// Backend code
router.get('/feedbacks', async (req, res) => {
  try {
    const feedbacks = await Contact.find();  // Fetch all feedbacks
    res.status(200).json(feedbacks);  // Send feedbacks as a response
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    res.status(500).json({ message: 'There was an error fetching feedbacks.' });
  }
});


module.exports = router;