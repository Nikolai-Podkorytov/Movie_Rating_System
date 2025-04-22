const Movie = require('../models/Movie');

const updateMovie = async (req, res) => {
  try {
    const movieId = req.params.id;
    const { title, director, genre, releaseYear } = req.body;

    // Поиск фильма по ID
    let movie = await Movie.findById(movieId);
    if (!movie) return res.status(404).send('Movie not found');

    // Проверка прав доступа (предполагается, что middleware auth уже наполнил req.user)
    if (!['admin', 'critic'].includes(req.user.role)) {
      return res.status(403).json({ message: 'Insufficient permissions' });
    }

    // Обновление полей
    movie.title = title || movie.title;
    movie.director = director || movie.director;
    movie.genre = genre || movie.genre;
    movie.releaseYear = releaseYear || movie.releaseYear;

    await movie.save();
    res.status(200).json({ message: 'Movie updated successfully', movie });
  } catch (err) {
    res.status(500).send('Error updating movie');
  }
};

const deleteMovie = async (req, res) => {
  try {
    const movieId = req.params.id;

    // Проверка прав доступа
    if (!['admin', 'critic'].includes(req.user.role)) {
      return res.status(403).json({ message: 'Insufficient permissions' });
    }

    const movie = await Movie.findByIdAndDelete(movieId);
    if (!movie) return res.status(404).send('Movie not found');

    res.status(200).json({ message: 'Movie deleted successfully' });
  } catch (err) {
    res.status(500).send('Error deleting movie');
  }
};

module.exports = { updateMovie, deleteMovie };
