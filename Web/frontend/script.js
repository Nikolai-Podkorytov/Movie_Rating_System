const registerForm = document.getElementById('registerForm');
const loginForm = document.getElementById('loginForm');
const getMoviesButton = document.getElementById('getMovies');

// Registration Functionality
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    const result = await response.text();
    document.getElementById('registerResult').innerText = result;
});

// Login Functionality
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    const result = await response.text();
    document.getElementById('loginResult').innerText = result;
});

// Fetch Movies Functionality
getMoviesButton.addEventListener('click', async () => {
    const response = await fetch('http://localhost:3000/movies', {
        method: 'GET',
    });

    const movies = await response.json();
    const moviesList = document.getElementById('moviesList');
    moviesList.innerHTML = '';
    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('col-md-4');
        movieElement.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${movie.title}</h5>
                    <p class="card-text">${movie.description}</p>
                    <p class="text-muted">${movie.genre} (${movie.release_year})</p>
                </div>
            </div>
        `;
        moviesList.appendChild(movieElement);
    });
});
