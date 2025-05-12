const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/jwtControllers');

// Явная обработка preflight OPTIONS для /register
router.options('/register', (req, res) => {
  console.log("OPTIONS /register received");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
  res.sendStatus(200);
});

// Явная обработка preflight OPTIONS для /login
router.options('/login', (req, res) => {
  console.log("OPTIONS /login received");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
  res.sendStatus(200);
});

// Public authentication routes
router.post('/register', register);
router.post('/login', login);

module.exports = router;
