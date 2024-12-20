import React from 'react';
import './Transparency.css'; // Import the CSS file for styling

const Transparency = () => {
  return (
    <div className="transparency-container">
      <h2>Transparency</h2>
      <section className="transparency-intro">
        <p>
          Transparency is a core principle of our system, ensuring that all transactions and processes are open and accessible to all stakeholders. 
          By utilizing blockchain technology, we provide an immutable and verifiable record of every action taken within the system. This fosters trust, 
          accountability, and clarity, as users can track and verify all activities in real-time.
        </p>
      </section>
      <section className="transparency-features">
        <h3>Key Features</h3>
        <ul>
          <li>Immutable Records: All transactions are permanently recorded on the blockchain, preventing tampering or alteration.</li>
          <li>Real-Time Access: Users can access and verify transaction records at any time, providing full visibility into the system.</li>
          <li>Audit Trails: Comprehensive logs of all activities ensure complete accountability and traceability.</li>
          <li>Open Data: Data is made available to stakeholders, enhancing trust and encouraging informed decision-making.</li>
        </ul>
      </section>
      <section className="transparency-benefits">
        <h3>Benefits</h3>
        <p>
          Enhanced transparency leads to increased trust and confidence among users. It minimizes the risk of fraud and misconduct, 
          improves compliance, and enables more informed decisions. By making processes and data visible, we create a more reliable and trustworthy environment.
        </p>
      </section>
    </div>
  );
}

export default Transparency;
