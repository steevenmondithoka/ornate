// routes/alumniRegistrationRoutes.js
const express = require('express');
const { protect, authorize } = require('../middleware/authMiddleware'); // Adjust path to your auth middleware
const {
    createAlumniRegistration,
    getAllAlumniRegistrations,
    updateEventIdeaStatus,
    deleteAlumniRegistration
} = require('../controllers/alumniRegistrationController'); // Adjust path to your controller

const router = express.Router();

// Public route for alumni to register
router.post('/', createAlumniRegistration);

// Admin routes (protected)
router.get('/', getAllAlumniRegistrations);
router.patch('/:id/event-status',  updateEventIdeaStatus);
router.delete('/:id',  deleteAlumniRegistration);

module.exports = router;