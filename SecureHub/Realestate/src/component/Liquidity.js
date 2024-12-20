import React from 'react';
import './Liquidity.css'; // Import the CSS file for styling

const Liquidity = () => {
  return (
    <div className="liquidity-container">
      <h2>Liquidity</h2>
      <section className="liquidity-intro">
        <p>
          Liquidity refers to the ease with which assets can be quickly converted into cash without significantly affecting their value. 
          In the context of real estate and investments, liquidity is crucial as it determines how readily an asset can be bought or sold. 
          Our platform utilizes blockchain technology to enhance liquidity by facilitating faster transactions and fractional ownership.
        </p>
      </section>
      <section className="liquidity-benefits">
        <h3>Benefits of Enhanced Liquidity</h3>
        <ul>
          <li>Faster Transactions: Reduced time required to buy or sell assets.</li>
          <li>Fractional Ownership: Ability to invest in smaller portions of high-value assets.</li>
          <li>Increased Market Access: Broader access to investment opportunities.</li>
          <li>Reduced Transaction Costs: Lower fees associated with buying and selling assets.</li>
        </ul>
      </section>
    </div>
  );
}

export default Liquidity;
