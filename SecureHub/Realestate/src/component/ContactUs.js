import React, { useState } from 'react';
import './ContactUs.css';
import prop1 from '../images/prop1.jpg';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [statusMessage, setStatusMessage] = useState(''); // To show success or error messages
  const [loading, setLoading] = useState(false); // To show a loading indicator during form submission

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setStatusMessage(''); // Reset previous status message
    setLoading(true); // Start loading

    try {
      const response = await fetch('http://localhost:5000/api/contact', { // Corrected URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setStatusMessage('Message sent successfully!');
        setFormData({ name: '', email: '', subject: '', message: '' }); // Reset form
      } else {
        setStatusMessage(data.message || 'There was an error sending your message.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setStatusMessage('There was an error sending your message.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="contact-us-container">
      <div className="contact-map">
        <img src={prop1} alt="Map of Pakistan" />
      </div>

      {/* Right Side - Contact Form */}
      <div className="contact-form-container">
        <h1>Contact Us</h1>
        <p>If you have any questions or inquiries, feel free to reach out to us using the form below.</p>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your name.."
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your email.."
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="subject">Subject:</label>
          <input
            type="text"
            id="subject"
            name="subject"
            placeholder="Subject.."
            value={formData.subject}
            onChange={handleChange}
            required
          />

          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            placeholder="Write your message.."
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit" disabled={loading}>
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>

        {statusMessage && <p className="status-message">{statusMessage}</p>}
      </div>
    </div>
  );
};

export default ContactUs;