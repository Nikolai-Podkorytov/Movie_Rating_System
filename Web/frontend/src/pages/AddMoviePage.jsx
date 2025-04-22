import React, { useState } from 'react';

const AddMoviePage = () => {
  const [formData, setFormData] = useState({
    title: '',
    director: '',
    genre: '',
    releaseYear: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = e => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/api/movies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(formData),
      });
      const result = await res.text();
      setMessage(result);
      setFormData({ title: '', director: '', genre: '', releaseYear: '' });
    } catch (err) {
      setMessage('❌ Failed to add movie');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Add a New Movie</h2>
      <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: '500px' }}>
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
        <button type="submit" className="btn btn-success w-100">Add Movie</button>
        <p className="text-center mt-3">{message}</p>
      </form>
    </div>
  );
};

export default AddMoviePage;
