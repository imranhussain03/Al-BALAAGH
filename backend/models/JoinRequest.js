const mongoose = require('mongoose');

const joinRequestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String, required: true },
  interestArea: { type: String, default: 'General' },
  message: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('JoinRequest', joinRequestSchema);
