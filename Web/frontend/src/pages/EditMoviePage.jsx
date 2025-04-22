import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';

const EditMoviePage = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    director: '',
    genre: '',
    releaseYear: '',
  });
  const [message, setMessage] = useState('');

  // Получение данных о фильме по ID
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await api.get(`/movies/${id}`);
        setFormData({
          title: res.data.title,
          director: res.data.director,
          genre: res.data.genre,
          releaseYear: res.data.releaseYear,
        });
      } catch (err) {
        setMessage('Error fetching movie details');
      }
    };

    fetchMovie();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/movies/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setMessage('Movie updated successfully');
      navigate('/movies'); // Перенаправление на страницу со списком фильмов после обновления
    } catch (err) {
      setMessage('Error updating movie');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Edit Movie</h2>
      <form onSubmit={handleUpdate}>
        <div className="mb-3">
          <input
            type="text"
            id="title"
            className="form-control"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            id="director"
            className="form-control"
            placeholder="Director"
            value={formData.director}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            id="genre"
            className="form-control"
            placeholder="Genre"
            value={formData.genre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="number"
            id="releaseYear"
            className="form-control"
            placeholder="Release Year"
            value={formData.releaseYear}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Movie</button>
        {message && <p className="mt-3">{message}</p>}
      </form>
    </div>
  );
};

export default EditMoviePage;
