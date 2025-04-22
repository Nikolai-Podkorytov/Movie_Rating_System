const User = require('../models/User');

/**
 * Get a list of all users (excluding their password field)
 */
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, '-password');
    res.status(200).json(users);
  } catch (err) {
    // Forward error to centralized error handler
    next(err);
  }
};

/**
 * Update a user's role
 * Expects: req.params.id, req.body.role
 */
const updateUserRole = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const { role } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res
      .status(200)
      .json({ message: 'User role updated successfully', user: updatedUser });
  } catch (err) {
    next(err);
  }
};

/**
 * Delete a user by ID
 */
const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllUsers, updateUserRole, deleteUser };
