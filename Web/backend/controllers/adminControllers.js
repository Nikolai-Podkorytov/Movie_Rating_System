const User = require('../models/User'); // Предполагается, что модель пользователя уже создана

// Получение списка всех пользователей (без поля password)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password');
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users' });
  }
};

// Изменение роли пользователя
const updateUserRole = async (req, res) => {
  try {
    const userId = req.params.id;
    const { role } = req.body; // передаём новую роль в теле запроса

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User role updated successfully', user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: 'Error updating user role' });
  }
};

// Удаление пользователя
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user' });
  }
};

module.exports = { getAllUsers, updateUserRole, deleteUser };
