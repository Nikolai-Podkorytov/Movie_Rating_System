import React, { useState, useEffect } from 'react';
import api from '../api';
import MovieCard from '../components/MovieCard';

const MoviesListPage = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('');
  const [releaseYear, setReleaseYear] = useState('');

  // Функция для получения списка фильмов с учетом фильтрации
  const fetchMovies = async () => {
    try {
      let query = '';
      if (search) query += `search=${encodeURIComponent(search)}&`;
      if (genre) query += `genre=${encodeURIComponent(genre)}&`;
      if (releaseYear) query += `releaseYear=${encodeURIComponent(releaseYear)}&`;
      
      const res = await api.get(`/movies?${query}`);
      setMovies(res.data);
    } catch (error) {
      console.error("Error fetching movies", error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchMovies();
  };

  return (
    <div className="container mt-5">
      <h2>Movies List</h2>
      {/* Форма поиска и фильтрации */}
      <form onSubmit={handleSearch} className="mb-4">
        <div className="row">
          <div className="col-md-4">
            <input 
              type="text" 
              placeholder="Search by title or director" 
              className="form-control" 
              value={search} 
              onChange={(e) => setSearch(e.target.value)} 
            />
          </div>
          <div className="col-md-3">
            <input 
              type="text" 
              placeholder="Genre" 
              className="form-control" 
              value={genre} 
              onChange={(e) => setGenre(e.target.value)} 
            />
          </div>
          <div className="col-md-3">
            <input 
              type="number" 
              placeholder="Release Year" 
              className="form-control" 
              value={releaseYear} 
              onChange={(e) => setReleaseYear(e.target.value)} 
            />
          </div>
          <div className="col-md-2">
            <button type="submit" className="btn btn-primary">Search</button>
          </div>
        </div>
      </form>

      {movies.length === 0 ? (
        <p>No movies found.</p>
      ) : (
        <div className="row">
          {movies.map(movie => (
            <div key={movie._id} className="col-md-4 mb-3">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MoviesListPage;
