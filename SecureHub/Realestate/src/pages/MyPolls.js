import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import './Mypool.css';

const MyPolls = () => {
  const [polls, setPolls] = useState([]); // To hold all the polls created by the user
  const [selectedPoll, setSelectedPoll] = useState(null); // To hold the selected poll
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user.email) {
          alert("You must be logged in to view polls.");
          navigate("/login");
          return;
        }

        // Fetch all polls created by the logged-in user
        const response = await axios.get(`http://localhost:5000/api/polls/getPollsByUser/${user.email}`);
        console.log(response.data.polls); // Log the polls to see if all polls are fetched
        
        setPolls(response.data.polls); // Set only the user's polls
      } catch (error) {
        console.error("Error fetching polls:", error);
        alert("Error fetching polls");
      }
    };

    fetchPolls();
  }, [navigate]);

  const handlePollSelection = (pollId) => {
    const selected = polls.find((poll) => poll._id === pollId);
    setSelectedPoll(selected);
  };

  return (
    <div className="my-polls-container">
      <h1>Your Polls</h1>
      {polls.length > 0 ? (
        <div>
          <select
            onChange={(e) => handlePollSelection(e.target.value)}
            value={selectedPoll ? selectedPoll._id : ""}
          >
            <option value="">Select a Poll</option>
            {polls.map((poll) => (
              <option key={poll._id} value={poll._id}>
                {poll.question}
              </option>
            ))}
          </select>

          {selectedPoll && (
            <div>
              <h2>{selectedPoll.question}</h2>
              <div>
                {selectedPoll.options.map((option, index) => (
                  <div key={index}>
                    <label htmlFor={option.text}>{option.text}</label>
                    <p>Votes: {option.votes}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <p>You haven't created any polls yet.</p>
      )}
    </div>
  );
};

export default MyPolls;
