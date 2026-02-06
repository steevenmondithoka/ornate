const Stall = require('../models/Stall');

// Public: Apply for a stall
exports.registerStall = async (req, res) => {
  try {
    const application = await Stall.create(req.body);
    res.status(201).json({ message: "Application submitted successfully", application });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Admin only: View all applications
exports.getAllStalls = async (req, res) => {
  try {
    const stalls = await Stall.find().sort({ createdAt: -1 });
    res.json(stalls);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin only: Update status (Approve/Reject)
exports.updateStallStatus = async (req, res) => {
  try {
    const stall = await Stall.findByIdAndUpdate(
      req.params.id, 
      { status: req.body.status }, 
      { new: true }
    );
    res.json(stall);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// server/controllers/stallController.js
exports.deleteStall = async (req, res) => {
    try {
        await Stall.findByIdAndDelete(req.params.id);
        res.json({ message: "Application deleted permanently" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};