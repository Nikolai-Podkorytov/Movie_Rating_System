const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { addReview, getReviewsByMovie } = require('../controllers/reviewControllers');

// Добавление отзыва – доступно только авторизованным пользователям
router.post('/', auth, addReview);

// Получение отзывов для конкретного фильма (не требует авторизации)
router.get('/', getReviewsByMovie);

module.exports = router;
