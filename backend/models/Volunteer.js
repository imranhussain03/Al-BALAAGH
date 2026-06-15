const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  aadhar: { type: String, required: true },
  education: { type: String, required: true },
  photo: { type: String },
  department: { type: String, required: true },
  message: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Volunteer', volunteerSchema);
