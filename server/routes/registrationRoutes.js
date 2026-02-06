const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration');
const Event = require('../models/Event');

// 1. GET ALL (Used by Admin Dashboard)
router.get('/all', async (req, res) => {
    try {
        // We populate 'eventId' to get the Event Name and Fee for the table
        const registrations = await Registration.find()
            .populate('eventId', 'name fee') 
            .sort({ registeredAt: -1 });
        
        res.json(registrations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 2. POST REGISTRATION (The logic that was missing)
router.post('/', async (req, res) => {
    try {
        const { eventId, name, email, phone, college, department, year, teamName, teamMembers } = req.body;

        // Basic validation
        if (!eventId || !name || !email || !phone) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const newRegistration = new Registration({
            eventId,
            name,
            email,
            phone,
            college,
            department,
            year,
            teamName,
            teamMembers,
            paymentStatus: 'pending' // Default status
        });

        const savedRegistration = await newRegistration.save();
        
        res.status(201).json({ 
            message: "Registration successful! Our team will contact you for payment.", 
            registration: savedRegistration 
        });
    } catch (err) {
        console.error("Registration Error:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// 3. PATCH PAYMENT STATUS
router.patch('/:id/payment-status', async (req, res) => {
    try {
        const { paymentStatus } = req.body;
        const registration = await Registration.findById(req.params.id);
        
        if (!registration) return res.status(404).json({ message: "Not found" });

        registration.paymentStatus = paymentStatus;
        
        if (paymentStatus === 'paid') {
            const event = await Event.findById(registration.eventId);
            if (event) registration.feePaid = event.fee;
        }

        await registration.save();
        res.json({ message: `Status updated to ${paymentStatus}` });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 4. DELETE REGISTRATION
router.delete('/:id', async (req, res) => {
    try {
        await Registration.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;