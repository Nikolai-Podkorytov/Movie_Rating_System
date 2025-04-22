/**
 * Role-based authorization middleware factory
 * Usage: checkRole(['admin','critic'])
 */
module.exports = (allowedRoles) => (req, res, next) => {
  if (!allowedRoles.includes(req.user.role)) {
    return res.status(403).json({ message: 'Insufficient permissions' });
  }
  next();
};
