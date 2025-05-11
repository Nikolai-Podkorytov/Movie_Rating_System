import React, { useState, useEffect } from 'react';
import api from '../api';
import * as jwtDecodeNamespace from 'jwt-decode';
const jwtDecode = jwtDecodeNamespace.default;


const ReviewSection = ({ movieId }) => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');

  // Получение отзывов по movieId
  const fetchReviews = async () => {
    try {
      const res = await api.get(`/reviews?movieId=${movieId}`);
      setReviews(res.data);
    } catch (err) {
      console.error('Error fetching reviews', err);
    }
  };

  useEffect(() => {
    if (movieId) {
      fetchReviews();
    }
  }, [movieId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating || !comment) {
      setMessage('Please fill all fields');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('You must be logged in to add a review');
        return;
      }
      await api.post('/reviews', { movieId, rating, comment }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('Review added successfully');
      setRating('');
      setComment('');
      fetchReviews(); // обновляем список отзывов
    } catch (err) {
      setMessage('Error adding review');
    }
  };

  return (
    <div className="mt-4">
      <h4>Reviews</h4>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        reviews.map(review => (
          <div key={review._id} className="border p-2 mb-2">
            <p><strong>{review.userId.username}</strong> rated it {review.rating}/10</p>
            <p>{review.comment}</p>
            <small>{new Date(review.createdAt).toLocaleString()}</small>
          </div>
        ))
      )}

      <hr />
      <h5>Add a Review</h5>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <input 
            type="number" 
            placeholder="Rating (1-10)" 
            className="form-control"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            min="1"
            max="10"
            required
          />
        </div>
        <div className="mb-2">
          <textarea 
            placeholder="Your review..." 
            className="form-control"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Submit Review</button>
      </form>
    </div>
  );
};

export default ReviewSection;
