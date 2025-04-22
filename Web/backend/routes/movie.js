const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');

// Добавление фильма (только для 'admin' или 'critic')
router.post('/', auth, checkRole(['admin', 'critic']), async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).send('🎬 Movie added successfully!');
  } catch (err) {
    res.status(400).send('❌ Error adding movie');
  }
});

module.exports = router;