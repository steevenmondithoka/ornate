const mongoose = require('mongoose');

const stallSchema = new mongoose.Schema({
  applicantName: { type: String, required: true },
  college: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  stallType: { type: String, required: true },
  description: String,
  status: { type: String, default: 'Pending', enum: ['Pending', 'Approved', 'Rejected'] },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Stall', stallSchema);