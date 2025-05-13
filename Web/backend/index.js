const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db');
const cors = require('cors'); // Импортируем cors
const path = require('path'); // Импортируем path для обработки маршрутов фронтенда

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Подключаем CORS, разрешая запросы с любого источника для локальной разработки
app.use(cors({
  origin: 'http://localhost:3001' // Разрешаем запросы с порта 3001
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

// Обработка маршрутов фронтенда
app.use(express.static(path.join(__dirname, 'frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
