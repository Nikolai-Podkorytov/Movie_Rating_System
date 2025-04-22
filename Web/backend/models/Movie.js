const mongoose = require('mongoose');

/**
 * Movie schema definition
 */
const MovieSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  genre:       { type: String, required: true },
  director:    { type: String, required: true },
  releaseYear: { type: Number, required: true },
  rating:      { type: Number, default: 0 }
});

module.exports = mongoose.model('Movie', MovieSchema);
