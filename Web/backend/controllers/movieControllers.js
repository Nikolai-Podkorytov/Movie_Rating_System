const Movie = require('../models/Movie');

/**
 * Update a movie's details
 * Access restricted to 'admin' or 'critic' roles
 */
const updateMovie = async (req, res, next) => {
  try {
    const movieId = req.params.id;
    const { title, director, genre, releaseYear } = req.body;

    // Find movie by ID
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    // Role-based access check (requires auth middleware to populate req.user)
    if (!['admin', 'critic'].includes(req.user.role)) {
      return res.status(403).json({ message: 'Insufficient permissions' });
    }

    // Update only provided fields
    movie.title = title || movie.title;
    movie.director = director || movie.director;
    movie.genre = genre || movie.genre;
    movie.releaseYear = releaseYear || movie.releaseYear;

    await movie.save();

    res
      .status(200)
      .json({ message: 'Movie updated successfully', movie });
  } catch (err) {
    next(err);
  }
};

/**
 * Delete a movie by ID
 * Access restricted to 'admin' or 'critic' roles
 */
const deleteMovie = async (req, res, next) => {
  try {
    // Role-based access check
    if (!['admin', 'critic'].includes(req.user.role)) {
      return res.status(403).json({ message: 'Insufficient permissions' });
    }

    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    res.status(200).json({ message: 'Movie deleted successfully' });
  } catch (err) {
    next(err);
  }
};

module.exports = { updateMovie, deleteMovie };
