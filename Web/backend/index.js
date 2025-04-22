const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

const authRoutes = require('./routes/auth');
const movieRoutes = require('./routes/movie');

// Middleware
app.use(express.json());

// Роуты
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);

// Проверка сервера
app.get('/', (req, res) => {
  res.send('🔥 Сервер работает!');
});

// База данных
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Подключено к MongoDB'))
  .catch(err => console.log('❌ Ошибка подключения к MongoDB:', err.message));

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
});
