const Review = require('../models/Review');

const addReview = async (req, res) => {
  try {
    const { movieId, rating, comment } = req.body;
    const userId = req.user.id; // Информация о пользователе должна быть заполнена через middleware auth

    if (!movieId || !rating || !comment) {
      return res.status(400).send('All fields are required');
    }

    const review = new Review({
      movieId,
      userId,
      rating,
      comment
    });

    await review.save();
    res.status(201).json({ message: 'Review added successfully', review });
  } catch (err) {
    res.status(500).send('Error adding review');
  }
};

const getReviewsByMovie = async (req, res) => {
  try {
    const { movieId } = req.query;
    if (!movieId) {
      return res.status(400).send('movieId query parameter is required');
    }
    // Запрашиваем отзывы и подставляем имя пользователя для отображения (username)
    const reviews = await Review.find({ movieId }).populate('userId', 'username');
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).send('Error fetching reviews');
  }
};

module.exports = { addReview, getReviewsByMovie };
