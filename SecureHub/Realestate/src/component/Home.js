// Home.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import prop4 from "../images/prop4.jpg";
import prop1 from "../images/prop1.jpg";
import prop2 from "../images/prop2.jpg";
import prop3 from "../images/prop3.jpg";
import prop5 from "../images/prop5.jpg";
import {FaVoteYea,FaWater,FaPassport,FaEye,FaBuilding,FaCreditCard} from "react-icons/fa";
import Construction from "../images/Construction.jpg";

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [prop4, prop1, prop2, prop3, prop5];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="home">
      {/* Welcome Section */}
      <section className="welcome-section">
        <div className="welcome-container">
          <div className="welcome-text">
            <h1>
              Your Family’s New Beginning Starts with the Right Home, Where
              Every Moment Matters
            </h1>
            <p>
              We are pioneering the future of real estate with cutting-edge
              blockchain technology. Explore our innovative solutions designed
              to bring transparency, efficiency, and security to the real estate
              industry.
            </p>
            <a href="#our-services" className="learn_more_button">
              Learn More
            </a>
          </div>

          {/* Image Carousel with Navigation Arrows */}
          <div className="welcome-image-container">
            <button className="arrow arrow-left" onClick={prevImage}>
              ❮
            </button>
            <img
              src={images[currentIndex]}
              alt="Home"
              className="welcome-image"
            />
            <button className="arrow arrow-right" onClick={nextImage}>
              ❯
            </button>
          </div>
        </div>
      </section>
    {/* Smart Construction Solutions Section */}
<section className="construction-section">
  <div className="construction-container">
    <div className="construction-text">
      <h2>Transforming Construction Projects</h2>
      <p>
        Revolutionize construction management with blockchain technology. From planning to execution, smart contracts ensure cost efficiency, transparency, and timely completion of real estate projects.
      </p>
      <ul className="construction-features">
        <li>
          <FaBuilding className="icon" />
          Automated Payments through Smart Contracts
        </li>
        <li>
          <FaEye className="icon" />
          Transparent Project Milestones and Tracking
        </li>
        <li>
          <FaCreditCard className="icon" />
          Reduced Overheads and Fraud Prevention
        </li>
      </ul>
      <Link to="/construction" className="learn-more-button">
        Explore Construction Module
      </Link>
    </div>
    <div className="construction-image">
      <img
        src={Construction} 
        alt="Smart Construction"
        className="construction-visual"
      />
    </div>
  </div>
</section>


      {/* New Video Section */}
      <section className="video-section">
        <div className="video-container">
          <div className="video-text">
            <h2>Discover the Future of Real Estate</h2>
            <p>
              Real estate is evolving, and we’re leading the way with advanced
              technology. Watch this video to understand how blockchain is
              revolutionizing the industry by ensuring secure and transparent
              transactions.
            </p>
          </div>
          <div className="video-wrapper">
            <video className="promo-video" controls>
              <source src="/videos/real-estate-overview.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      {/* Property Listings Grid */}
      <div id="our-services" className="property-listings-section">
        <h2 style={{ color: "#27ae60" }}>Our Services</h2>
        <p>Read our Services that are useful for our every customer</p>
        </div>

      <div className="property-listings-grid">
        <Link to="/voting" className="property-listing">
          <FaVoteYea className="icon voting" />
          <h3>Voting/Tokenization</h3>
          <p>
            Leverage blockchain-based tokenization to enable seamless and secure
            property ownership voting and fractional investments.
          </p>
        </Link>
        <Link to="/liquidity" className="property-listing">
          <FaWater className="icon liquidity" />
          <h3>Liquidity</h3>
          <p>
            Improve market access with liquidity solutions powered by blockchain
            for faster and more efficient transactions.
          </p>
        </Link>
        <Link to="/passport" className="property-listing">
          <FaPassport className="icon passport" />
          <h3>Digital Passport</h3>
          <p>
            Simplify real estate transactions with a digital passport system for
            secure and verifiable property records.
          </p>
        </Link>
        <Link to="/transparency" className="property-listing">
          <FaEye className="icon transparency" />
          <h3>Transparency</h3>
          <p>
            Ensure complete transparency in property ownership and transaction
            histories using immutable blockchain records.
          </p>
        </Link>
        <Link to="/construction" className="property-listing">
          <FaBuilding className="icon construction" />
          <h3>Construction</h3>
          <p>
            Utilize smart contracts to streamline construction projects,
            ensuring efficiency and cost-effectiveness.
          </p>
        </Link>
        <Link to="/Fractional" className="property-listing">
          <FaCreditCard className="icon payment" />
          <h3>Payment</h3>
          <p>
            Secure and quick payment solutions for real estate investments
            through blockchain-based platforms.
          </p>
        </Link>
      </div>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h2>Our Clients Say!</h2>
        <p>We take pride in providing exceptional service to our clients.</p>

        {/* Testimonial 1 */}
        <div className="testimonial">
          <p>
            "Working with this platform was a game-changer for me. I found my
            dream home in no time!"
          </p>
          <h3>- John Doe</h3>
          <p>Property Dealer</p>
        </div>

        {/* Testimonial 2 */}
        <div className="testimonial">
          <p>
            "The transparency and efficiency provided by this platform made my
            investment in real estate seamless."
          </p>
          <h3>- Sarah Smith</h3>
          <p>Investor</p>
        </div>

        {/* Testimonial 3 */}
        <div className="testimonial">
          <p>
            "Highly recommend! Their blockchain technology ensures security and
            trust in every transaction."
          </p>
          <h3>- Ahmed Khan</h3>
          <p>Home Buyer</p>
        </div>

        {/* Testimonial 4 */}
        <div className="testimonial">
          <p>
            "Highly recommend! Their blockchain technology ensures the
            transparency of the property."
          </p>
          <h3>- Majid Khan</h3>
          <p>Home Buyer</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
