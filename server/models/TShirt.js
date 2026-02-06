const mongoose = require('mongoose');

const tShirtSchema = new mongoose.Schema({
  name: { type: String, required: true },
  usn: { type: String, required: true, uppercase: true }, // College ID
  email: { type: String, required: true },
  phone: { type: String, required: true },
  department: { type: String, required: true },
  size: { 
    type: String, 
    required: true, 
    enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'] 
  },
  // transactionId field REMOVED
  status: { 
    type: String, 
    default: 'Pending', 
    enum: ['Pending', 'Delivered'] // Simplified status
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TShirt', tShirtSchema);