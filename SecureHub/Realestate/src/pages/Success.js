import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { mintTokens } from '../services/token';

const SuccessPage = () => {
  const { amountPaid, walletPublicKey } = useParams(); // Extract parameters from the URL
  const [status, setStatus] = useState('Processing...');
  const navigate = useNavigate();

  useEffect(() => {
    const mintTokensFromPayment = async () => {
      try {
        const tokensToMint = parseInt(amountPaid) / 5; // 1 Token = $5
        if (isNaN(tokensToMint) || tokensToMint <= 0) {
          setStatus('Invalid payment amount. Cannot mint tokens.');
          return;
        }

        // Call the mintTokens API
        await mintTokens(walletPublicKey, tokensToMint);
        setStatus('Tokens minted successfully!');
        setTimeout(() => {
          navigate('/userdashboard'); // Redirect to the user dashboard after minting
        }, 1000);
      } catch (err) {
        console.error('Error minting tokens:', err);
      }
    };

    mintTokensFromPayment();
  }, [amountPaid, walletPublicKey, navigate]);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Payment Successful</h1>
      <p>{status}</p>
      {status === 'Tokens minted successfully!' && (
        <p>Redirecting to your dashboard...</p>
      )}
    </div>
  );
};

export default SuccessPage;
