const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db');
const cors = require('cors'); // Импортируем cors

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Подключаем CORS, разрешая запросы с нужного домена
app.use(cors({
  origin: 'https://movie-rating-system-front.onrender.com'
}));

// Подключаем парсинг JSON (оставляем один вызов)
app.use(express.json());

// (Опционально) Если вам нужно логировать OPTIONS запросы, можно добавить middleware после cors
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    console.log("Получен OPTIONS запрос:", req.originalUrl);
    // CORS уже настроен, поэтому можно просто отправить статус
    return res.sendStatus(200);
  }
  next();
});

// Тестовый роут для проверки API
app.get('/api', (req, res) => {
  res.send('API is working');
});

// Подключение маршрутов
app.use('/api/admin', require('./routes/admin'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/movies', require('./routes/movie'));
app.use('/api/reviews', require('./routes/review'));

// Централизованный обработчик ошибок
app.use(require('./middleware/errorHandler'));

// Health check
app.get('/', (req, res) => {
  res.send('🔥 Server is running');
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
