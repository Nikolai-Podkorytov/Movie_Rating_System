import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import ReviewSection from '../components/ReviewSection';

const MovieDetailPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [message, setMessage] = useState('');

  const fetchMovie = async () => {
    try {
      const res = await api.get(`/movies/${id}`);
      setMovie(res.data);
    } catch (err) {
      setMessage('Error fetching movie details');
    }
  };

  useEffect(() => {
    fetchMovie();
  }, [id]);

  return (
    <div className="container mt-5">
      {message && <p>{message}</p>}
      {movie ? (
        <>
          <h2>{movie.title}</h2>
          <p><strong>Director:</strong> {movie.director}</p>
          <p><strong>Genre:</strong> {movie.genre}</p>
          <p><strong>Release Year:</strong> {movie.releaseYear}</p>
          <hr />
          <ReviewSection movieId={movie._id} />
        </>
      ) : (
        <p>Loading movie details...</p>
      )}
    </div>
  );
};

export default MovieDetailPage;
