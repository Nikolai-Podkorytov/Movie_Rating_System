import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import AddMoviePage from './pages/AddMoviePage';
import RequireRole from './utils/RequireRole';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/add-movie"
          element={
            <RequireRole allowedRoles={['admin', 'critic']}>
              <AddMoviePage />
            </RequireRole>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
