const mongoose = require('mongoose');

/**
 * Review schema
 * References both Movie and User
 */
const ReviewSchema = new mongoose.Schema({
  movieId:   { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  userId:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating:    { type: Number, required: true },
  comment:   { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', ReviewSchema);
