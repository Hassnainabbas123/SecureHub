import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { checkOwnership } from '../services/plot';
import { useNavigate } from 'react-router-dom';
import './VotePoll.css';

const VotePoll = () => {
  const [polls, setPolls] = useState([]);
  const [filteredPolls, setFilteredPolls] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [userEmail, setUserEmail] = useState('');
  const [searchTerm, setSearchTerm] = useState(''); // State for search input
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));

        if (!user || !user.email) {
          alert('You must be logged in to view plot details.');
          navigate('/login');
          return;
        }

        setUserEmail(user.email);

        if (!user.wallet) {
          alert('Create a wallet first.');
          navigate('/userdashboard');
          return;
        }

        const res = await checkOwnership(user.email);
        if (!res.hasTokens) {
          alert('You must own tokens to view plot details.');
          navigate('/userdashboard');
          return;
        }

        const response = await axios.get('http://localhost:5000/api/polls/getpolls');
        if (response.data.success) {
          setPolls(response.data.polls);
          setFilteredPolls(response.data.polls); // Initialize filtered polls
        } else {
          alert('Failed to fetch polls.');
        }
      } catch (error) {
        alert('Error fetching polls: ' + error.message);
      }
    };

    fetchPolls();
  }, [navigate]);

  useEffect(() => {
    // Filter polls based on search term
    const filtered = polls.filter((poll) =>
      poll.question.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPolls(filtered);
  }, [searchTerm, polls]);

  const calculatePercentage = (votes, totalVotes) => {
    return totalVotes === 0 ? 0 : Math.round((votes / totalVotes) * 100);
  };

  const handleOptionSelect = (pollId, optionText) => {
    setSelectedOptions((prevState) => ({
      ...prevState,
      [pollId]: optionText,
    }));
  };

  const handleVoteSubmit = async (pollId) => {
    if (!userEmail) {
      alert('Please login to vote.');
      return;
    }

    const selectedOption = selectedOptions[pollId];
    if (!selectedOption) {
      alert('Please select an option to vote.');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:5000/api/polls/vote/${pollId}`, {
        selectedOption,
        email: userEmail,
      });

      if (response.data.success) {
        alert('Vote cast successfully!');
        setPolls((prevPolls) =>
          prevPolls.map((poll) =>
            poll._id === pollId ? { ...poll, options: response.data.updatedPoll.options } : poll
          )
        );
        navigate('/userdashboard');
      } else {
        alert('Failed to vote: ' + response.data.error);
      }
    } catch (error) {
      alert('Error voting: ' + error.response?.data?.error || error.message);
    }
  };

  return (
    <div>
      <h1>Vote on Polls</h1>     
      <input
        type="text"
        placeholder="Search polls..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      {filteredPolls.map((poll) => {
        const totalVotes = poll.options.reduce((sum, option) => sum + option.votes, 0);
        const hasVoted = poll.votedEmails.includes(userEmail);

        // Determine the option with the most votes
        const maxVotes = Math.max(...poll.options.map((option) => option.votes));
        const maxVoteOptions = poll.options.filter((option) => option.votes === maxVotes);

        return (
          <div key={poll._id} className="poll">
            <h2>{poll.question}</h2>
            <div className="options">
              {poll.options.map((option, index) => {
                const percentage = calculatePercentage(option.votes, totalVotes);
                const isSelected = selectedOptions[poll._id] === option.text;
                const isMostVoted = maxVoteOptions.length === 1 && option.votes === maxVotes;

                return (
                  <div
                    key={index}
                    className={`option-container ${isMostVoted ? 'most-votes' : ''}`}
                  >
                    <input
                      type="radio"
                      id={`option-${poll._id}-${index}`}
                      name={`poll-${poll._id}`}
                      value={option.text}
                      checked={isSelected}
                      onChange={() => handleOptionSelect(poll._id, option.text)}
                      disabled={hasVoted}
                    />
                    <label htmlFor={`option-${poll._id}-${index}`} className="option">
                      <span className="option-text">{option.text}</span>
                      <span className="percentage">
                        {percentage}% ({option.votes} votes)
                      </span>
                    </label>
                    <div className="progress-bar">
                      <div
                        className="progress"
                        style={{
                          width: `${percentage}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
            <button
              onClick={() => handleVoteSubmit(poll._id)}
              className="submit-vote-button"
              disabled={!selectedOptions[poll._id] || hasVoted}
            >
              {hasVoted ? 'Already Voted' : 'Submit Vote'}
            </button>
          </div>
        );
      })}

      <button onClick={() => navigate('/userdashboard')}>Go to Dashboard</button>
    </div>
  );
};

export default VotePoll;
