const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/jwtConfig');

/**
 * Authentication middleware
 * Verifies JWT token and attaches decoded payload to req.user
 */
module.exports = (req, res, next) => {
  // Expect "Authorization: Bearer <token>"
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};
