/**
 * Centralized error handler
 * Catches errors from controllers that call next(err)
 */
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res
    .status(err.status || 500)
    .json({ message: err.message || 'Internal Server Error' });
};

module.exports = errorHandler;
