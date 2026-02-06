const express = require('express');
const router = express.Router();
const { getUpdates, createUpdate, deleteUpdate } = require('../controllers/updateController');
const { protect } = require('../middleware/authMiddleware'); // Assuming you have auth middleware

// Public route to fetch updates (for the main website ticker)
router.get('/', getUpdates);

// Protected routes (for admin dashboard)
router.post('/', protect, createUpdate);
router.delete('/:id', protect, deleteUpdate);

module.exports = router;