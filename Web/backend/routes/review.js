const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { addReview, getReviewsByMovie } = require('../controllers/reviewControllers');

/**
 * POST /api/reviews
 * Add a new review (authenticated users only)
 */
router.post('/', auth, addReview);

/**
 * GET /api/reviews?movieId=...
 * Get reviews for a specific movie (public)
 */
router.get('/', getReviewsByMovie);

module.exports = router;
