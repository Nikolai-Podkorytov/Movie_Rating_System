const jwt = require('jsonwebtoken');
const User = require('../models/User');

// User registration controller
const register = async (req, res, next) => {
  try {
    const { username, email, password, role } = req.body;

    // Check if email is already in use
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    // Create and save new user
    const user = new User({ username, email, password, role });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    next(err);
  }
};

// User login controller
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Приведение email к нижнему регистру (если это нужно)
    const normalizedEmail = email ? email.toLowerCase() : email;

    // Поиск пользователя по email
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Проверка пароля
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // Создаем JWT с идентификатором пользователя и его ролью
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      token,
      role: user.role,
      username: user.username
    });
  } catch (err) {
    next(err);
  }
};


module.exports = { register, login };
