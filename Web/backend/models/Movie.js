const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Название фильма
  genre: { type: String, required: true }, // Жанр
  director: { type: String, required: true }, // Режиссёр
  releaseYear: { type: Number, required: true }, // Год выпуска
  rating: { type: Number, default: 0 }, // Оценка фильма
});

module.exports = mongoose.model('Movie', MovieSchema);
