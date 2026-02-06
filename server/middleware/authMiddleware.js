const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  let token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Not authorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded; // Contains id and role
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token failed' });
  }
};

// Check if user is Super Admin
const superAdminOnly = (req, res, next) => {
  if (req.admin && req.admin.role === 'superadmin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Super Admin only.' });
  }
};

module.exports = { protect, superAdminOnly };