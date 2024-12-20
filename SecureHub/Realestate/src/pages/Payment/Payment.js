import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js"; 
import CheckoutPage from "../CheckoutPage/CheckoutPage";
import { useParams } from "react-router-dom";
import "./Payment.css";

// Initialize Stripe
const stripePromise = loadStripe("pk_test_51QUUuZB2moq1TjZjwhScctjbTSUjrXGkbre1lzAgn9eps24WgKhQUEpcoowW7iuAvuaGmkyHvV3cpE0mogbE0oGL00suIM1zPS");

const Payments = () => {

  const { amount } = useParams();

  const convertToSubcurrency = (amount, factor = 100) => {
    return Math.round(amount * factor);
  };

  return (
    <div className="main-container">
      <div className="header">
        <h1>Complete Your Payment</h1>
        
      </div>

      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: convertToSubcurrency(amount),
          currency: "usd",
        }}
      >
        <CheckoutPage amount={amount} />
      </Elements>
    </div>
  );
};

export default Payments;