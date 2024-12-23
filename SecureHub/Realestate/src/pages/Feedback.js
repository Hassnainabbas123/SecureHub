import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Feedback.css'; 

const Feedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/feedbacks');
        setFeedbacks(response.data);
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <div className="feedbacks-container">
      <h2 className="feedbacks-title">Customer Feedbacks</h2>
      <div className="feedbacks-list">
        {feedbacks.map((feedback) => (
          <div key={feedback._id} className="feedback-item">
            <p className="name">{feedback.name}</p>
            <p className="message">{feedback.message}</p>
            <p className="info">{new Date(feedback.dateSent).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feedbacks;