const express = require('express');
const router = express.Router();
const { registerStall, getAllStalls, updateStallStatus ,deleteStall} = require('../controllers/stallController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerStall);
router.get('/admin', protect, getAllStalls);
router.patch('/:id/status', protect, updateStallStatus);
router.delete('/:id', protect, deleteStall);

module.exports = router;