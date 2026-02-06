const TShirt = require('../models/TShirt');

// Register for T-Shirt (Public)
exports.registerTShirt = async (req, res) => {
  try {
    const newOrder = new TShirt(req.body);
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: "Registration failed", error: error.message });
  }
};

// Get All Orders (Admin)
exports.getAllOrders = async (req, res) => {
  try {
    // Sort by status (Pending first) then date
    const orders = await TShirt.find().sort({ status: 1, createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Status (Admin - e.g. Mark as Verified or Delivered)
exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await TShirt.findByIdAndUpdate(
      req.params.id, 
      { status }, 
      { new: true }
    );
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Order (Admin)
exports.deleteOrder = async (req, res) => {
  try {
    await TShirt.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Order deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};