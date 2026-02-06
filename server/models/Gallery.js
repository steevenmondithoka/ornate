const mongoose = require('mongoose');
const gallerySchema = new mongoose.Schema({
  url: { type: String, required: true }, // Cloudinary URL or YouTube ID
  type: { type: String, required: true, enum: ['photo', 'video'] },
  caption: String,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Gallery', gallerySchema);