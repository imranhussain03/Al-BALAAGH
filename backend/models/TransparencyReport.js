const mongoose = require('mongoose');

const transparencyReportSchema = new mongoose.Schema({
  month: { type: String, required: true },
  year: { type: Number, required: true },
  totalCollected: { type: Number, required: true },
  totalSpent: { type: Number, required: true },
  screenshot: { type: String, required: true }, // Cloudinary URL
  description: { type: String, required: true },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('TransparencyReport', transparencyReportSchema);

