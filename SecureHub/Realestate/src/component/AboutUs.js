import React from "react";
import "./AboutUs.css";
import sabihImage from "../images/sabihimage.jpeg";
import aounImage from "../images/aounimage.jpeg";
import hassnainImage from "../images/hassnainimage.jpeg";
import Aboutpic from "../images/AboutUs.jpg";
import missionImage from "../images/missionImage.png"; // New mission section image

const AboutUs = () => {
  return (
    <div className="about-us">
      <div
        className="about-us-hero"
        style={{
          backgroundImage: `url(${Aboutpic})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "#fff",
          textAlign: "center",
          padding: "100px 20px",
        }}
      >
        <h1 className="hero-title">About Us</h1>
        <p className="hero-text">
          Welcome to our Real Estate Management System. We are dedicated to
          revolutionizing the real estate industry through transparency,
          efficiency, and innovation.
        </p>
      </div>

      <div className="about-us-content">
        {/* Our Mission Section */}
        <section className="mission-section">
          <div className="mission-container">
            <div className="mission-image">
              <img src={missionImage} alt="Our Mission" />
            </div>
            <div className="mission-text">
              <h2>Our Mission</h2>
              <p>
                Our mission is to simplify and secure the real estate management
                process for all stakeholders by leveraging cutting-edge
                blockchain technology.
              </p>
            </div>
          </div>
        </section>

        <section className="team-section">
          <h2>Meet the Team</h2>
          <div className="team-members">
            <div className="team-member">
              <img
                src={sabihImage}
                alt="Muhammad Sabih Ul Hassan"
                className="team-image"
              />
              <h3>Muhammad Sabih Ul Hassan</h3>
              <p>
                <a href="mailto:210971@students.au.edu.pk">
                  210971@students.au.edu.pk
                </a>
              </p>
              <p>
                <a
                  href="https://wa.me/923356023326"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  03356023326
                </a>
              </p>
            </div>
            <div className="team-member">
              <img
                src={aounImage}
                alt="Muhammad Aoun Tariq"
                className="team-image"
              />
              <h3>Muhammad Aoun Tariq</h3>
              <p>
                <a href="mailto:210972@students.au.edu.pk">
                  210972@students.au.edu.pk
                </a>
              </p>
              <p>
                <a
                  href="https://wa.me/923061527877"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  03061527877
                </a>
              </p>
            </div>
            <div className="team-member">
              <img
                src={hassnainImage}
                alt="Hassnain Abbas"
                className="team-image"
              />
              <h3>Hassnain Abbas</h3>
              <p>
                <a href="mailto:211031@students.au.edu.pk">
                  211031@students.au.edu.pk
                </a>
              </p>
              <p>
                <a
                  href="https://wa.me/923039356645"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  03039356645
                </a>
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h2>Our Clients Say!</h2>
        <p>We take pride in providing exceptional service to our clients.</p>

        <div className="testimonial">
          <p>
            "Working with this platform was a game-changer for me. I found my
            dream home in no time!"
          </p>
          <h3>- John Doe</h3>
          <p>Property Dealer</p>
        </div>
        <div className="testimonial">
          <p>
            "The transparency and efficiency provided by this platform made my
            investment in real estate seamless."
          </p>
          <h3>- Sarah Smith</h3>
          <p>Investor</p>
        </div>
        <div className="testimonial">
          <p>
            "Highly recommend! Their blockchain technology ensures security and
            trust in every transaction."
          </p>
          <h3>- Ahmed Khan</h3>
          <p>Home Buyer</p>
        </div>
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

export default AboutUs;
