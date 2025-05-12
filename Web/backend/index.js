const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Подключение к базе данных
connectDB();

// Парсинг JSON
app.use(express.json());

// Глобальный обработчик для всех OPTIONS запросов
app.use(express.json());

// Глобальный обработчик для всех OPTIONS-запросов:
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    console.log("Получен OPTIONS запрос: ", req.originalUrl);  // Добавляем лог для проверки
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
    return res.sendStatus(200);
  }
  next();
});

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
