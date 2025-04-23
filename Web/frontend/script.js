// File: script.js
// Description: Handles user registration, login, and fetching movies from backend API.

// Select DOM elements
const registerForm = document.getElementById('registerForm');
const loginForm    = document.getElementById('loginForm');
const getMoviesBtn = document.getElementById('getMovies');

// Base API URL: prefer environment variable, fallback to localhost
const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

// Helper: display a message in a given element
function showMessage(elementId, message) {
  const el = document.getElementById(elementId);
  if (el) el.innerText = message;
}

// =======================
// USER REGISTRATION LOGIC
// =======================
if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const email    = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    try {
      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      });
      const data = await response.json();
      showMessage('registerResult', data.message || 'Registration successful');
    } catch (err) {
      console.error('Registration error:', err);
      showMessage('registerResult', 'Error registering user');
    }
  });
}

// ===================
// USER LOGIN LOGIC
// ===================
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value;

    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      if (!response.ok) throw new Error('Login failed');
      const data = await response.json();
      // Store JWT for future requests
      localStorage.setItem('token', data.token);
      showMessage('loginResult', 'Login successful');
    } catch (err) {
      console.error('Login error:', err);
      showMessage('loginResult', 'Error logging in');
    }
  });
}

// ====================
// FETCH MOVIES LOGIC
// ====================
if (getMoviesBtn) {
  getMoviesBtn.addEventListener('click', async () => {
    try {
      const response = await fetch(`${BASE_URL}/movies`);
      const movies   = await response.json();

      const moviesList = document.getElementById('moviesList');
      moviesList.innerHTML = '';

      movies.forEach(movie => {
        const div = document.createElement('div');
        div.classList.add('col-md-4');
        div.innerHTML = `
          <div class="card h-100">
            <div class="card-body">
              <h5 class="card-title">${movie.title}</h5>
              <p class="card-text"><strong>Director:</strong> ${movie.director}</p>
              <p class="text-muted">${movie.genre} (${movie.releaseYear})</p>
            </div>
          </div>`;
        moviesList.appendChild(div);
      });
    } catch (err) {
      console.error('Fetch movies error:', err);
      alert('Failed to fetch movies');
    }
  });
}