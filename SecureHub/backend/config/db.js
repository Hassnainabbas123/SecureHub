const mongoose = require('mongoose');

// const walletSchema = new mongoose.Schema({
//   walletaddress: { type: String, required: true, unique: true },
//   userType: { type: String, required: true },
// });

// const Wallet = mongoose.model('Wallet', walletSchema);

// const contactMessageSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true },
//   subject: { type: String, required: true },
//   message: { type: String, required: true },
// });

// const ContactMessage = mongoose.model('ContactMessage', contactMessageSchema);

const connectDB = async () => {
  try {
    // await mongoose.connect(
    //   'mongodb+srv://210972:aoun1234@210972.jdw42pf.mongodb.net/testdb?retryWrites=true&w=majority&appName=210972',
    //   { useNewUrlParser: true, useUnifiedTopology: true }
    // );

    await mongoose.connect(
      'mongodb://localhost:27017/',
      { useNewUrlParser: true, useUnifiedTopology: true }
    );

    console.log('MongoDB connected successfully.');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

module.exports = { connectDB};
