// models/AlumniRegistration.js
const mongoose = require('mongoose');

const alumniRegistrationSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true, // Alumni typically have unique emails
        trim: true,
        lowercase: true
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true
    },
    passingYear: {
        type: String, // Storing as string to match frontend dropdown values
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    currentOccupation: {
        type: String,
        trim: true
    },
    companyName: {
        type: String,
        trim: true
    },
    attendFest: {
        type: String, // 'yes' or 'no'
        required: true
    },
    conductEvent: {
        type: String, // 'yes' or 'no'
        required: true
    },
    eventIdea: {
        type: String, // Only present if conductEvent is 'yes'
        trim: true
    },
    eventIdeaStatus: { // New field for admin to manage event ideas
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    }
}, { timestamps: true }); // Adds createdAt and updatedAt fields

const AlumniRegistration = mongoose.model('AlumniRegistration', alumniRegistrationSchema);

module.exports = AlumniRegistration;