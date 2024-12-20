import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/auth';
import "./Login.css";
import loginpic from "../images/Loginpic.jpg";

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Check for hardcoded admin credentials
    if (formData.email === 'sabihulhassan343@gmail.com' && formData.password === 'sabih321') {
      localStorage.setItem('user', JSON.stringify({ email: formData.email, role: 'society-owner' }));
      alert('Welcome Society Owner! Redirecting to Society Owner dashboard...');
      navigate('/society-owner-dashboard');
      return;
    }

    if (formData.email === 'sabihulhassan343@gmail.com' && formData.password === 'sabih') {
      localStorage.setItem('user', JSON.stringify({ email: formData.email, role: 'admin' }));
      alert('Welcome Admin! Redirecting to admin dashboard...');
      navigate('/admin-dashboard');
      return;
    }

    // If not admin, proceed with normal login
    try {
      const data = await loginUser(formData);
      localStorage.setItem('user', JSON.stringify(data.user));
      alert('Login successful! Redirecting to dashboard...');
      navigate('/userdashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="custom-login-container">
      <div className="custom-login-content">
        <div className="custom-login-image">
          <img src={loginpic} alt="Login Visual" />
        </div>
        <div className="custom-login-form">
          <h1 className="custom-login-title">Login</h1>
          {error && <p className="custom-login-error">{error}</p>}
          <form onSubmit={handleSubmit}>
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
            <button type="submit" className="custom-login-btn">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
