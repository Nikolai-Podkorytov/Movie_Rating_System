const express = require('express');
const dotenv = require('dotenv');
//const cors = require('cors');
const connectDB = require('./db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to database
connectDB();

// Built-in middleware to parse JSON bodies
app.use(express.json());
app.use((req, res, next) => {
  // Разрешаем запросы с любого источника; если хотите ограничить конкретным доменом, замените '*' на нужный URL
  res.header("Access-Control-Allow-Origin", "*");
  // Указываем какие заголовки могут быть в запросе
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  // Для preflight-запроса (OPTIONS) разрешаем методы
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
    return res.status(200).json({});
  }
  next();
});

//app.use(cors());
//app.options('*', cors());

// Route handlers
app.use('/api/admin', require('./routes/admin'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/movies', require('./routes/movie'));
app.use('/api/reviews', require('./routes/review'));

// Centralized error handler
app.use(require('./middleware/errorHandler'));

// Health check
app.get('/', (req, res) => {
  res.send('🔥 Server is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
