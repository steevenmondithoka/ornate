const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const { protect, superAdminOnly } = require('../middleware/authMiddleware');

// Add a new admin (Super Admin Only)
router.post('/add', protect, superAdminOnly, async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = await Admin.create({ 
        name, 
        email, 
        password: hashedPassword, 
        role: role || 'admin' 
    });
    res.status(201).json({ message: "Admin created successfully" });
  } catch (err) {
    res.status(400).json({ message: "Admin already exists or invalid data" });
  }
});

// Delete an admin (Super Admin Only)
router.delete('/:id', protect, superAdminOnly, async (req, res) => {
  try {
    await Admin.findByIdAndDelete(req.params.id);
    res.json({ message: "Admin removed successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting admin" });
  }
});

// Get all admins (To list them in the dashboard)
router.get('/all', protect, superAdminOnly, async (req, res) => {
    const admins = await Admin.find().select('-password');
    res.json(admins);
});

module.exports = router;