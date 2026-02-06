// controllers/alumniRegistrationController.js
const AlumniRegistration = require('../models/AlumniRegistration'); // Adjust path to your model

// @route   POST api/alumni-registrations
// @desc    Register a new alumni
// @access  Public
exports.createAlumniRegistration = async (req, res) => {
    try {
        const { email } = req.body;

        // Check if alumni with this email already exists
        const existingAlumni = await AlumniRegistration.findOne({ email });
        if (existingAlumni) {
            return res.status(400).json({ msg: 'Alumni with this email is already registered.' });
        }

        const newRegistration = new AlumniRegistration(req.body);
        await newRegistration.save();
        res.status(201).json({ msg: 'Alumni registration successful!', registration: newRegistration });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @route   GET api/alumni-registrations (Admin Only)
// @desc    Get all alumni registrations
// @access  Private (Admin)
exports.getAllAlumniRegistrations = async (req, res) => {
    try {
        const registrations = await AlumniRegistration.find().sort({ createdAt: -1 });
        res.json(registrations);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @route   PATCH api/alumni-registrations/:id/event-status (Admin Only)
// @desc    Update event idea status for an alumni registration
// @access  Private (Admin)
exports.updateEventIdeaStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body; // 'Approved', 'Rejected', 'Pending'

        if (!['Approved', 'Rejected', 'Pending'].includes(status)) {
            return res.status(400).json({ msg: 'Invalid status provided.' });
        }

        const registration = await AlumniRegistration.findById(id);
        if (!registration) {
            return res.status(404).json({ msg: 'Alumni registration not found' });
        }

        registration.eventIdeaStatus = status;
        await registration.save();
        res.json({ msg: `Event idea status updated to ${status}`, registration });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @route   DELETE api/alumni-registrations/:id (Admin Only)
// @desc    Delete an alumni registration
// @access  Private (Admin)
exports.deleteAlumniRegistration = async (req, res) => {
    try {
        const { id } = req.params;
        const registration = await AlumniRegistration.findByIdAndDelete(id);

        if (!registration) {
            return res.status(404).json({ msg: 'Alumni registration not found' });
        }

        res.json({ msg: 'Alumni registration deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};