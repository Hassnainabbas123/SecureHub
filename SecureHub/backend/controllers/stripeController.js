require("dotenv").config();
const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

exports.getStripekey = async (req, res) => {
    try {
        const { amount } = req.body;
        const paymentIntent = await stripe.paymentIntents.create({
          amount: amount,
          currency: "usd",
          automatic_payment_methods: { enabled: true },
        });
    
        res.status(200).json({ clientSecret: paymentIntent.client_secret });
      } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: error.message });
      }
};
