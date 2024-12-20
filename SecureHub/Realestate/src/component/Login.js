import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Loginpage = () => {
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
      const result = await axios.post('http://localhost:5000/login', { walletAddress, userType });
      if (result.data === 'Success') {
        if (userType === 'Admin') {
          navigate('/admindashboard/apage');
        } else if (userType === 'Property Owner') {
          navigate('/propertyownerdashboard/owner');
        } else {
          navigate('/userdashboard/fpage');
        }
      } else {
        alert('Login failed. No record found.');
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <img src="https://via.placeholder.com/400x500" alt="Login Illustration" className="login-image" />
      </div>
      <div className="login-right">
        <h1>Login</h1>
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
          <button type="submit" className="submit-btn">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Loginpage;
