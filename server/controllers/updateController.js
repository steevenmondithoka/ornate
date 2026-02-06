const Update = require('../models/Update');

// Get all updates (Sorted newest first)
exports.getUpdates = async (req, res) => {
  try {
    const updates = await Update.find().sort({ createdAt: -1 });
    res.status(200).json(updates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new update
exports.createUpdate = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ message: "Text is required" });

    const newUpdate = new Update({ text });
    await newUpdate.save();

    res.status(201).json(newUpdate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an update
exports.deleteUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    await Update.findByIdAndDelete(id);
    res.status(200).json({ message: "Update deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};