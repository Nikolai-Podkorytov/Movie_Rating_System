const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');
const { updateMovie, deleteMovie } = require('../controllers/movieControllers');

/**
 * GET /api/movies
 * Public endpoint for listing and filtering movies
 */
router.get('/', async (req, res, next) => {
  try {
    const { search, genre, releaseYear } = req.query;
    const query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { director: { $regex: search, $options: 'i' } }
      ];
    }
    if (genre) query.genre = genre;
    if (releaseYear) query.releaseYear = Number(releaseYear);

    const movies = await Movie.find(query);
    res.json(movies);
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/movies/:id
 * Protected endpoint for movie details
 */
router.get('/:id', auth, async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.json(movie);
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/movies
 * Protected: only 'admin' or 'critic'
 */
router.post('/', auth, checkRole(['admin', 'critic']), async (req, res, next) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).json({ message: 'Movie added successfully' });
  } catch (err) {
    next(err);
  }
});

/**
 * PUT /api/movies/:id
 * Protected: update movie
 */
router.put('/:id', auth, checkRole(['admin', 'critic']), updateMovie);

/**
 * DELETE /api/movies/:id
 * Protected: delete movie
 */
router.delete('/:id', auth, checkRole(['admin', 'critic']), deleteMovie);

module.exports = router;
