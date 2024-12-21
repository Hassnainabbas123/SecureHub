import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../images/logo.png';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  return (
    <nav className="navbar">
      {/* Logo Section */}
      <div className="navbar-logo">
        <img src={logo} alt="Logo" className="logo" />
        <Link to="/home" className="title-link">Secure Hub</Link>
      </div>
      
      {/* Navigation Links */}
      <ul className="navbar-links">
        <li><Link to="/home">Home</Link></li>
        <li className="dropdown">
          <a href="#services" onClick={toggleDropdown}>Services</a>
          <ul className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}>
            <li><Link to="/voting">Voting/Tokenization</Link></li>
            <li><Link to="/liquidity">Liquidity</Link></li>
            <li><Link to="/passport">Digital Passport</Link></li>
            <li><Link to="/transparency">Transparency</Link></li>
            <li><Link to="/Construction">Construction</Link></li>
            <li><Link to="/Fractional">Payment</Link></li>
            <li><Link to="/Testimonials">Testimonials</Link></li>
          </ul>
        </li>
        <li><Link to="/aboutus">About Us</Link></li>
        <li><Link to="/contact">Contact Us</Link></li>
      
      </ul>

      {/* Login and Signup Buttons */}
      <div className="navbar-buttons">
        <Link to="/login" className="login-button">Log In</Link>
        <Link to="/signup" className="signup-button">Sign Up</Link>

      </div>
    </nav>
  );
};

export default Navbar;
