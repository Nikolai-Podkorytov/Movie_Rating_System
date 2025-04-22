const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');
const { updateMovie, deleteMovie } = require('../controllers/movieControllers');

// GET - List movies with advanced search and filtering
router.get('/', async (req, res) => {
  try {
    const { search, genre, releaseYear } = req.query;
    let query = {};

    // Если передан параметр поиска, ищем по полям title и director (без учета регистра)
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { director: { $regex: search, $options: 'i' } },
      ];
    }
    
    // Фильтрация по жанру
    if (genre) {
      query.genre = genre;
    }
    
    // Фильтрация по году выпуска (приводим к числу)
    if (releaseYear) {
      query.releaseYear = Number(releaseYear);
    }
    
    const movies = await Movie.find(query);
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching movies' });
  }
});

// GET - Get details of a single movie (с защитой авторизацией)
router.get('/:id', auth, async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).send('Movie not found');
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).send('Error fetching movie details');
  }
});

// POST - Add a new movie (для авторизованных пользователей с ролями admin или critic)
router.post('/', auth, checkRole(['admin', 'critic']), async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).send('🎬 Movie added successfully!');
  } catch (err) {
    res.status(400).send('❌ Error adding movie');
  }
});

// PUT - Update movie
router.put('/:id', auth, checkRole(['admin', 'critic']), updateMovie);

// DELETE - Delete movie
router.delete('/:id', auth, checkRole(['admin', 'critic']), deleteMovie);

module.exports = router;
