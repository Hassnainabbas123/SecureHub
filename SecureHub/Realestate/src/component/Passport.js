import React from 'react';
import './Passport.css'; // Import the CSS file for styling

const Passport = () => {
  return (
    <div className="digital-passport-container">
      <h2>Digital Passport</h2>
      <section className="digital-passport-intro">
        <p>
          A Digital Passport is a blockchain-based identity management system that securely stores and verifies personal information. 
          It provides a tamper-proof, digital record of an individual's identity, which can be used for various purposes such as 
          authentication, verification, and access to services. The Digital Passport simplifies identity management, enhances privacy, 
          and improves security.
        </p>
      </section>
      <section className="digital-passport-features">
        <h3>Features</h3>
        <ul>
          <li>Secure Storage: Personal data is stored securely on the blockchain, preventing unauthorized access and tampering.</li>
          <li>Privacy Protection: Users control their own data and can choose what information to share and with whom.</li>
          <li>Easy Verification: Simplifies identity verification processes with a single, immutable record.</li>
          <li>Access Control: Facilitates secure and controlled access to services and platforms.</li>
        </ul>
      </section>
      <section className="digital-passport-benefits">
        <h3>Benefits</h3>
        <p>
          Digital Passports offer numerous benefits including enhanced security, reduced fraud, improved user privacy, and streamlined 
          identity verification. By leveraging blockchain technology, users can enjoy a more secure and efficient way of managing their 
          personal information and accessing services.
        </p>
      </section>
    </div>
  );
}

export default Passport;
