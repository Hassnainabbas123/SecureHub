const express = require('express');
const app = express();

const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const walletRoutes = require('./routes/walletRoutes');
const tokenRoutes = require('./routes/tokenRoutes');
const realTokRoutes = require('./routes/realTokRoutes');
const pollRoutes = require("./routes/pollRoutes");
const stripeRoutes = require("./routes/stripeRoutes");
const mongoose = require('mongoose');
const uri = "mongodb://127.0.0.1:27017/";

const testimonialsRoutes = require('./routes/TestimonalsRoutes');
const contactRoutes = require("./routes/ContactUs")

const connectDB = async () => {
    try {
        await mongoose.connect(uri);
        console.log("Connected Successfully");



    } catch (error) {
        console.error("Error:", error);
    }
    
}



app.use(cors());
app.use(express.json()); // To parse JSON bodies

// Connect to the database
connectDB();



app.use('/api/auth', authRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/tokens', tokenRoutes);
app.use('/api/plots', realTokRoutes); 
app.use("/api/polls", pollRoutes);
app.use("/api/stripe", stripeRoutes);
// app.use("/api/stripe", stripeRoutes);
app.use('/api', testimonialsRoutes);
app.use("/api", contactRoutes);









const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
