import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signuppage.css';

const Signuppage = () => {
  const [userType, setUserType] = useState('User');
  const [walletAddress, setWalletAddress] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const navigate = useNavigate();

  const connectMetaMask = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setIsConnected(true);
        }
      } catch (error) {
        console.error('MetaMask connection failed:', error);
        alert('MetaMask connection failed.');
      }
    } else {
      alert('MetaMask is not installed.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       axios.post('http://localhost:5000/wallet', { walletAddress, userType });
      alert('Signup successful!');
      navigate('/login'); // Redirect to login page after successful signup
    } catch (error) {
      console.error('Signup failed:', error);
      alert('Signup failed. Please try again.');
    }
  };

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      {!isConnected ? (
        <button onClick={connectMetaMask} className="connect-btn">Connect MetaMask</button>
      ) : (
        <p>Wallet Connected: {walletAddress}</p>
      )}
      <form onSubmit={handleSubmit}>
        <div className="user-type-selection">
          {['Admin', 'Property Owner', 'User'].map((type) => (
            <label key={type}>
              <input
                type="radio"
                value={type}
                checked={userType === type}
                onChange={() => setUserType(type)}
              />
              {type}
            </label>
          ))}
        </div>
        <div className="wallet-input">
          <label>
            Wallet Address:
            <input
              type="text"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              disabled={isConnected}
            />
          </label>
        </div>
        <button type="submit" className="submit-btn">Sign Up</button>
      </form>
      <p>Already have an account? <a href="/login">Login</a></p>
    </div>
  );
};

export default Signuppage;
