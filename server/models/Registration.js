const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event', // Links to the Event model
    required: true,
  },
  // Basic User Info (you might link to a User model if you have one)
  registeredBy: { // If a user needs to be logged in to register
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model for authentication
    required: false, // Make true if registration requires login
  },
  // General Contact Info
  name: { type: String, required: true }, // Main participant's name
  email: { type: String, required: true },
  phone: { type: String, required: true },
  college: { type: String, required: true },
  department: { type: String, required: true },
  year: { type: String }, // e.g., "1st Year", "2nd Year"

  // Team-specific details (if event.teamSize is not "Individual")
  teamName: { type: String, required: function() { return this.teamMembers && this.teamMembers.length > 0; } },
  teamMembers: [ // Array of objects for team members
    {
      name: { type: String, required: true },
      email: { type: String, required: false }, // Email might be optional for team members
      phone: { type: String, required: false },
    }
  ],

  // Payment Status (if applicable)
  feePaid: { type: Number, default: 0 }, // Amount actually paid
  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "failed"],
    default: "pending",
  },
  paymentRefId: String, // Transaction ID from payment gateway

  registeredAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Registration", registrationSchema);