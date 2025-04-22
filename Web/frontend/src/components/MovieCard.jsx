import React from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const MovieCard = ({ movie, refreshMovies }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/edit-movie/${movie._id}`);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      try {
        await api.delete(`/movies/${movie._id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        refreshMovies(); // Обновление списка фильмов после удаления
      } catch (err) {
        alert('Error deleting movie');
      }
    }
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{movie.title}</h5>
        <p className="card-text">Director: {movie.director}</p>
        <p className="card-text">Genre: {movie.genre}</p>
        <p className="card-text">Release Year: {movie.releaseYear}</p>
        <div className="d-flex justify-content-between mt-3">
          <button className="btn btn-secondary" onClick={handleEdit}>
            Edit
          </button>
          <button className="btn btn-danger" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
