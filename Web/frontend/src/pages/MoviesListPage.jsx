import React, { useState, useEffect } from 'react';
import api from '../api';
import MovieCard from '../components/MovieCard';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import '../styles/animations.css'; // Добавьте этот файл в папке со стилями

const MoviesListPage = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('');
  const [releaseYear, setReleaseYear] = useState('');

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

      <TransitionGroup className="row">
        {movies.map(movie => (
          <CSSTransition key={movie._id} timeout={300} classNames="fade">
            <div className="col-md-4 mb-3">
              <MovieCard movie={movie} />
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};

export default MoviesListPage;
