const express = require("express");
const router = express.Router();
const {
  registerTShirt,
  getAllOrders,
  updateStatus,
  deleteOrder,
} = require("../controllers/tshirtController");

// Define Routes
router.post("/", registerTShirt);
router.get("/", getAllOrders);
router.patch("/:id/status", updateStatus);
router.delete("/:id", deleteOrder);


module.exports = router;
