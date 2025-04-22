const registerForm = document.getElementById('registerForm');
const loginForm = document.getElementById('loginForm');
const getMoviesButton = document.getElementById('getMovies');

const BASE_URL = 'http://localhost:3000/api';

// Register
if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = document.getElementById('username').value.trim();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;

      try {
          const response = await fetch(`${BASE_URL}/auth/register`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ username, email, password }),
          });

          const result = await response.text();
          document.getElementById('registerResult').innerText = result;
      } catch (err) {
          document.getElementById('registerResult').innerText = 'Error registering.';
      }
  });
}

// Login
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = document.getElementById('loginUsername').value.trim();
      const password = document.getElementById('loginPassword').value;

      try {
          const response = await fetch(`${BASE_URL}/auth/login`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ username, password }),
          });

          if (!response.ok) {
            throw new Error('Login failed');
          }

          const result = await response.json();
          localStorage.setItem('token', result.token);
          document.getElementById('loginResult').innerText = '✅ Успешный вход!';
      } catch (err) {
          document.getElementById('loginResult').innerText = '❌ Ошибка входа.';
      }
  });
}

// Fetch Movies
if (getMoviesButton) {
  getMoviesButton.addEventListener('click', async () => {
      try {
          const response = await fetch(`${BASE_URL}/movies`);
          const movies = await response.json();

          const moviesList = document.getElementById('moviesList');
          moviesList.innerHTML = '';

          movies.forEach(movie => {
              const movieElement = document.createElement('div');
              movieElement.classList.add('col-md-4');
              movieElement.innerHTML = `
                  <div class="card h-100">
                      <div class="card-body">
                          <h5 class="card-title">${movie.title}</h5>
                          <p class="card-text"><strong>Director:</strong> ${movie.director}</p>
                          <p class="text-muted">${movie.genre} (${movie.releaseYear})</p>
                      </div>
                  </div>
              `;
              moviesList.appendChild(movieElement);
          });
      } catch (err) {
          alert('Failed to fetch movies.');
      }
  });
}
