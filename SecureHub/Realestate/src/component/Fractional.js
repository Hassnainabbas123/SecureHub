import React from 'react';
import './Fractional.css'; // Import the CSS file for styling

const Fractional = () => {
  return (
    <div className="fractional-container">
      <h2>Fractional Ownership</h2>
      <p>
        Fractional ownership allows multiple individuals to co-own a single property, sharing both the costs and benefits. 
        This model provides a cost-effective way to invest in high-value real estate, offering greater accessibility and 
        diversified investment opportunities. Each owner holds a specific share of the property, which can be bought, sold, 
        or transferred according to the terms of the ownership agreement.
      </p>
      <div className="benefits">
        <h3>Benefits</h3>
        <ul>
          <li>Reduced financial burden by sharing costs</li>
          <li>Access to high-value properties with lower individual investment</li>
          <li>Diversified investment portfolio</li>
          <li>Potential for rental income and appreciation</li>
        </ul>
      </div>
    </div>
  );
}

export default Fractional;
