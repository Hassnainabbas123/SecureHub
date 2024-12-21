import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import './Testimonials.css';

const TestimonialPage = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [newTestimonial, setNewTestimonial] = useState({ name: "", role: "", message: "" });

  // Fetch testimonials from the API
  useEffect(() => {
    axios.get("http://localhost:5000/api/testimonials")
      .then((response) => setTestimonials(response.data))
      .catch((error) => {
        console.error(error);
        alert("Failed to load testimonials. Please try again.");
      });
  }, []);

  // Handle submission of new testimonial
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/api/testimonials", newTestimonial)
      .then((response) => {
        setTestimonials([response.data, ...testimonials]);
        setNewTestimonial({ name: "", role: "", message: "" });
        window.location.href = "/"; // Redirect to homepage
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to submit your testimonial. Please try again.");
      });
  }, [newTestimonial, testimonials]);

  return (
    <div className="testimonial-page">
      <h2>Submit Your Testimonial</h2>

      {/* Testimonial Submission Form */}
      <form onSubmit={handleSubmit} className="testimonial-form">
        <input
          type="text"
          placeholder="Your Name"
          value={newTestimonial.name}
          onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })}
          required
        />
        
        {/* Role as radio buttons */}
        <div className="role-section">
          <label>
            <input
              type="radio"
              name="role"
              value="User"
              checked={newTestimonial.role === "User"}
              onChange={(e) => setNewTestimonial({ ...newTestimonial, role: e.target.value })}
            />
            User
          </label>
          <label>
            <input
              type="radio"
              name="role"
              value="Investor"
              checked={newTestimonial.role === "Investor"}
              onChange={(e) => setNewTestimonial({ ...newTestimonial, role: e.target.value })}
            />
            Investor
          </label>
        </div>

        <textarea
          placeholder="Your Message"
          value={newTestimonial.message}
          onChange={(e) => setNewTestimonial({ ...newTestimonial, message: e.target.value })}
          required
        ></textarea>
        <button type="submit">Submit</button>
      </form>

     
    </div>
  );
};

export default TestimonialPage;