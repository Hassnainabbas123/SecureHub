import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { verifyOtp } from '../services/auth'; // Make sure verifyOtp is correctly imported

const OtpVerification = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state; // Email passed from the signup page

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await verifyOtp({ email, otp });
      alert('OTP verified! Redirecting to login...');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid OTP. Please try again.');
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>OTP Verification</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'inline-block', textAlign: 'left' }}>
        <div style={{ marginBottom: '10px' }}>
          <label>OTP: </label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            style={{ padding: '5px', width: '200px' }}
            required
          />
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: 'blue',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Verify OTP
        </button>
      </form>
    </div>
  );
};

export default OtpVerification;
