import React from 'react';
import './Voting.css'; // Import the CSS file for styling

const VotingAndTokenization = () => {
  return (
    <div className="voting-tokenization-container">
      <h2>Voting and Tokenization</h2>
      <section className="voting-section">
        <h3>Voting System</h3>
        <p>
          Our voting system leverages blockchain technology to provide a transparent, secure, and tamper-proof process. 
          Each vote is recorded as a transaction on the blockchain, ensuring that votes are counted accurately and cannot 
          be altered. This system enhances trust and integrity in the voting process, whether for governance decisions or 
          organizational elections.
        </p>
      </section>
      <section className="tokenization-section">
        <h3>Tokenization</h3>
        <p>
          Tokenization involves converting ownership rights into digital tokens on the blockchain. These tokens can represent 
          various assets, including real estate, shares, or even votes. Tokenization provides liquidity, fractional ownership, 
          and easier transferability, making it a powerful tool for modernizing asset management and investment.
        </p>
      </section>
    </div>
  );
}

export default VotingAndTokenization;
