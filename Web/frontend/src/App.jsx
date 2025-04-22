import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AddMoviePage from './pages/AddMoviePage';
import EditMoviePage from './pages/EditMoviePage';
import MoviesListPage from './pages/MoviesListPage';
import MovieDetailPage from './pages/MovieDetailPage';
import RequireRole from './utils/RequireRole';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/add-movie" element={
          <RequireRole allowedRoles={['admin', 'critic']}>
            <AddMoviePage />
          </RequireRole>
        } />
        <Route path="/edit-movie/:id" element={
          <RequireRole allowedRoles={['admin', 'critic']}>
            <EditMoviePage />
          </RequireRole>
        } />
        <Route path="/movies" element={<MoviesListPage />} />
        <Route path="/movie/:id" element={<MovieDetailPage />} />
        {/* Другие маршруты, если необходимо */}
      </Routes>
    </Router>
  );
};

export default App;
