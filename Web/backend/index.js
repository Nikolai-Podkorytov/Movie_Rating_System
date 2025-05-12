const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to database
connectDB();

// Built-in middleware для парсинга JSON
app.use(express.json());

// Глобальный обработчик OPTIONS (если нужен)
// Если ты доверяешь явным обработчикам в routes/auth.js, эту часть можно закомментировать
// app.options('*', (req, res) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
//   res.sendStatus(200);
// });

// Подключаем маршруты
app.use('/api/admin', require('./routes/admin'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/movies', require('./routes/movie'));
app.use('/api/reviews', require('./routes/review'));

// Обработчик ошибок
app.use(require('./middleware/errorHandler'));

// Health check
app.get('/', (req, res) => {
  res.send('🔥 Server is running');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
