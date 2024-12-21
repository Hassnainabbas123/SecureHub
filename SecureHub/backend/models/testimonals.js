
const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  message: { type: String, required: true },
  likes: { type: Number, default: 0 },
  
});


const Testimonial = mongoose.model("Testimonial", testimonialSchema);

module.exports = Testimonial;