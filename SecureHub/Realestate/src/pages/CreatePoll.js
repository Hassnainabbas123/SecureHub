import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { checkOwnership } from '../services/plot';
import { useNavigate } from 'react-router-dom';
import './CreatePoll.css';

const CreatePoll = () => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']); // Minimum 2 options

  const navigate = useNavigate();

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const addOption = () => setOptions([...options, '']);
  const removeOption = (index) => setOptions(options.filter((_, i) => i !== index));

  const handleCreatePoll = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.email) {
      alert('Please login to create a poll.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/polls/createpoll', {
        question,
        options,
        createdBy: user.email,
      });

      if (response.data.success) {
        alert('Poll created successfully!');
        setQuestion('');
        setOptions(['', '']);

        // Redirect to user dashboard after successful poll creation
        navigate('/userdashboard');
      } else {
        alert('Failed to create poll: ' + response.data.error);
      }
    } catch (error) {
      alert('Error creating poll: ' + error.message);
    }
  };

  useEffect(() => {
    const check = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.email) {
          alert('You must be logged in to view plot details.');
          navigate('/login');
          return;
        }
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
      } catch (error) {
        alert('Error fetching polls: ' + error.message);
      }
    };

    check();
  }, [navigate]);

  return (
    <div className="poll-form-container">
      <form className="poll-form" onSubmit={handleCreatePoll}>
        <h1>Create Poll</h1>
        <textarea
          placeholder="Enter your poll question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />
        {options.map((option, index) => (
          <div className="option-container" key={index}>
            <input
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              placeholder={`Option ${index + 1}`}
              required
            />
            {options.length > 2 && (
              <button type="button" onClick={() => removeOption(index)}>
                Remove
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={addOption}>
          Add Option
        </button>
        <button type="submit">Create Poll</button>
      </form>
    </div>
  );
};

export default CreatePoll;
