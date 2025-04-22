import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const token = localStorage.getItem('token');
  let role = null;
  if (token) {
    try {
      const decoded = JSON.parse(atob(token.split('.')[1]));
      role = decoded.role;
    } catch (err) {
      console.error('Invalid token');
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Movie Rating System</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/movies">Movies</Link>
            </li>
            {role === 'admin' && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin">Admin Panel</Link>
              </li>
            )}
            {/* Добавьте другие ссылки по необходимости */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
