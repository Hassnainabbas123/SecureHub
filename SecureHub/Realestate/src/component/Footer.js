import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import "./Footer.css";
import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";


const Footer = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBPy9fmj2VOg_m9LLLAsV4mm5le_f_X0Ak&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    window.initMap = () => {
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: 33.690738, lng: 72.978355 },
        zoom: 15,
      });

      new window.google.maps.Marker({
        position: { lat: 33.690738, lng: 72.978355 },
        map,
        title: "My location",
      });
    };
  }, []);

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Map Section */}
        <div className="footer-section map-section">
          <h2>Location</h2>
          <div id="map"></div>
        </div>

        {/* Address Section */}
        <div className="footer-section address-section">
          <h2>Address</h2>
          <p>Air University Islamabad</p>
          <p>xyz@students.au.edu.pk</p>
          <p>+92 3039356645</p>
        </div>

        {/* Company Section */}
        <div className="footer-section company-section">
          <h2>Company</h2>
          <p>
            <Link to="/services">Services</Link>
          </p>
          <p>
            <Link to="/aboutus">About Us</Link>
          </p>
          <p>
            <Link to="/contact">Contact Us</Link>
          </p>
        </div>

        {/* Social Media Section */}
        <div className="footer-section social-media-section">
          <h2>Follow Us</h2>
          <div className="social-media">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              style={{ color: "#4267B2" }}
            >
              <FaFacebookF />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              style={{ color: "#0077B5" }}
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              style={{ color: "#E1306C" }}
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} Secure Hub. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
