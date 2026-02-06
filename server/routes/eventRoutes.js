const express = require("express");
const router = express.Router();

// 1. ADD THIS LINE (Make sure the path matches your model folder)
const Event = require("../models/Event");

const {
  createEvent,
  getEvents,
  deleteEvent,
} = require("../controllers/eventController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", getEvents);
router.post("/", protect, createEvent);
router.delete("/:id", protect, deleteEvent);

// Now Event.findByIdAndUpdate will work!
// Example Backend Logic (Express)
// routes/events.js

router.get("/:id", async (req, res) => {
  // Notice the :id parameter
  try {
    const event = await Event.findById(req.params.id); // Find by ID
    if (!event) {
      return res.status(404).json({ message: "Event not found" }); // If no event is found
    }
    res.json(event);
  } catch (err) {
    // Handle cases where the ID format is invalid (e.g., not a valid MongoDB ObjectId)
    // Mongoose's findById will throw an error if the ID is malformed
    if (err.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid Event ID format" });
    }
    res.status(500).json({ message: err.message });
  }
});

// Toggle Registration Status
router.patch("/:id/registration-status", async (req, res) => {
  try {
    const { registrationOpen } = req.body;
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { registrationOpen },
      { new: true },
    );
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.patch("/:id/like", async (req, res) => {
  try {
    const { isUnlike } = req.body;

    // More robust check: handle boolean true OR string "true"
    const shouldDecrement = isUnlike === true || isUnlike === "true";

    // If unliking, subtract 1. If liking, add 1.
    const increment = shouldDecrement ? -1 : 1;

    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: increment } },
      { new: true },
    );

    if (!event) return res.status(404).json({ message: "Event not found" });

    res.json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
