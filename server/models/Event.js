const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dept: { type: String, required: true, enum: ["cse", "mech", "ece", "eee", "civil", "all"] },
  date: { type: String, required: true }, // Consider Date type for proper sorting/comparisons
  time: { type: String, required: true },
  venue: { type: String, required: true },
  likes: { type: Number, default: 0 },
  description: String,
  tagline: String,
  imageUrl: String,
  rules: [String],
  judgingCriteria: String,
  fee: { type: Number, default: 0 }, // Fee in currency units (e.g., INR)
  teamSize: { // This will dictate the form fields for team members
    type: String, // e.g., "Individual", "2-4 members", "up to 5 members"
    default: "Individual"
  },
  contactPerson: String,
  contactNumber: String,
  // registrationLink: String, // No longer needed if we're generating in-app
  registrationOpen: { type: Boolean, default: true },
  registrationDeadline: { type: Date }, // Using Date type for proper comparison

  // --- NEW FIELD FOR CUSTOM REGISTRATION FIELDS (Optional but powerful) ---
  // You could add an array of objects to define custom fields the admin wants
  // e.g., [{ label: "College ID", type: "text", required: true }, { label: "T-Shirt Size", type: "select", options: ["S", "M", "L"] }]
  // For now, let's keep it simpler with fixed fields, but this is an extension point.
});

module.exports = mongoose.model("Event", eventSchema);