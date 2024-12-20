import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/auth';
import './Signup.css'; 
import signupImage from '../images/signup-image.jpg';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await registerUser(formData);
      alert('Signup successful! OTP sent to your email.');
      navigate('/OtpVerification', { state: { email: formData.email } });
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="custom-signup-container">
      <div className="custom-signup-content">
        {/* Left Section: Signup Form */}
        <div className="custom-signup-form">
          <h1 className="custom-signup-title">Signup</h1>
          {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="custom-input-group">
              <label>Name: </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="custom-input-group">
              <label>Email: </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="custom-input-group">
              <label>Password: </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="custom-signup-btn">Signup</button>
          </form>
        </div>

        {/* Right Section: Image */}
        <div className="custom-signup-image">
          <img src={signupImage} alt="Signup Visual" />
        </div>
      </div>
    </div>
  );
};

export default Signup;
