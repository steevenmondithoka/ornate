const Event = require("../models/Event");

// Admin only: Add Event
exports.createEvent = async (req, res) => {
  // DEBUG LOG: Look at your terminal after clicking Publish
  

  try {
    const newEvent = new Event(req.body);
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    console.error("SAVE ERROR:", error.message);
    res.status(400).json({ message: error.message });
  }
};

// Public: Get all events or filter by department
exports.getEvents = async (req, res) => {
  const { dept } = req.query; // e.g., /api/events?dept=cse
  try {
    const filter = dept ? { dept } : {};
    const events = await Event.find(filter).sort({ time: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin only: Delete Event
exports.deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Event removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
