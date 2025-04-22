const Review = require('../models/Review');

/**
 * Add a review for a movie
 * Requires authentication middleware to fill req.user.id
 */
const addReview = async (req, res, next) => {
  try {
    const { movieId, rating, comment } = req.body;
    const userId = req.user.id;

    // Validate required fields
    if (!movieId || rating == null || !comment) {
      return res
        .status(400)
        .json({ message: 'movieId, rating and comment are required' });
    }

    // Create and save review
    const review = new Review({ movieId, userId, rating, comment });
    await review.save();

    res
      .status(201)
      .json({ message: 'Review added successfully', review });
  } catch (err) {
    next(err);
  }
};

/**
 * Get all reviews for a given movie
 * Publicly accessible
 */
const getReviewsByMovie = async (req, res, next) => {
  try {
    const { movieId } = req.query;
    if (!movieId) {
      return res
        .status(400)
        .json({ message: 'movieId query parameter is required' });
    }

    // Populate user's username for each review
    const reviews = await Review.find({ movieId }).populate(
      'userId',
      'username'
    );
    res.status(200).json(reviews);
  } catch (err) {
    next(err);
  }
};

module.exports = { addReview, getReviewsByMovie };
