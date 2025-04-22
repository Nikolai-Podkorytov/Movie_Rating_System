const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Проверка на существующего пользователя
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).send('Email уже зарегистрирован');

    const user = new User({ username, email, password, role });
    await user.save();

    res.status(201).send('Пользователь успешно зарегистрирован');
  } catch (err) {
    res.status(500).send('Ошибка регистрации');
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(400).send('Пользователь не найден');

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).send('Неверный пароль');

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token, role: user.role, username: user.username });
  } catch (err) {
    res.status(500).send('Ошибка при входе');
  }
};

module.exports = { register, login };
