const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to database
connectDB();

// Built-in middleware to parse JSON bodies
app.use(express.json());

app.use(cors());
app.options('*', cors());

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
