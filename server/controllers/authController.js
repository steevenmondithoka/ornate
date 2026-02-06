
const Admin = require('../models/Admin'); // <--- ADD THIS LINE
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    // Include role in the token
    const token = jwt.sign(
      { id: admin._id, role: admin.role }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1d' }
    );

    res.json({ 
      token, 
      admin: { name: admin.name, email: admin.email, role: admin.role } 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};