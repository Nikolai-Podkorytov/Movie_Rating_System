import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AddMoviePage from './pages/AddMoviePage';
import EditMoviePage from './pages/EditMoviePage';
import MoviesListPage from './pages/MoviesListPage';
import MovieDetailPage from './pages/MovieDetailPage';
import AdminDashboard from './pages/AdminDashboard';
import RequireRole from './utils/RequireRole';

const App = () => {
  return (
    <>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
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
        <Route path="/admin" element={
          <RequireRole allowedRoles={['admin']}>
            <AdminDashboard />
          </RequireRole>
        } />
        {/* Другие маршруты */}
      </Routes>
    </>
  );
};

export default App;
