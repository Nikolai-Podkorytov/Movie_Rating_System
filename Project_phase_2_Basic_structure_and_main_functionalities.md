# Project phase 2 - Basic structure and main functionalities

This phase describes the foundational setup and main functionalities of the Movie Rating System application. The goal of this phase was to implement the basic features by integrating the frontend, backend, and database, as well as implementing key interactions such as user authentication and full CRUD operations for movies.

## 1. Environment

The development environment for this project includes:

Frontend Framework: React (created with Create React App)

Backend Platform: Node.js with Express

Database: MongoDB (originally PostgreSQL was used, but it has been replaced with MongoDB)

Hosting / Deployment: Render (a cloud-based deployment service)

Package Manager: npm

## 2. Backend

The backend is built using Node.js and the Express framework. It provides a RESTful API that handles movie data and user authentication using JSON Web Tokens (JWT). Key endpoints include:

POST /api/auth/register: Registers new users.

POST /api/auth/login: Authenticates users and issues JWTs.

POST /api/movies: Adds new movies (accessible to users with roles such as "admin" or "critic").

GET /api/movies: Retrieves all movies from the database.

PUT /api/movies/:id: Updates movie information.

DELETE /api/movies/:id: Deletes a movie with appropriate role-based access control.

The backend uses Mongoose for interacting with MongoDB, bcrypt for password hashing, and JWT to secure routes.

## 3. Frontend

The frontend is built using React and utilizes React Router for navigation and axios for API calls. The main pages include:

Login Page: A login form that authenticates the user and stores the JWT in localStorage.

Register Page: A registration form for new users.

Add Movie Page: A form that allows authorized users to add a new movie with fields for the title, director, genre, and release year.

Movies List Page: A page displaying all movies in responsive card layouts.

Key features include the use of reusable components (like Navbar and MovieCard), a combination of React-Bootstrap and custom CSS for styling, and an axios instance that reads the backend URL from a React environment variable.

## 4. Database

The database uses MongoDB to store movie and user data. The movie collection schema includes:

title (String): The name of the movie.

director (String): The director of the movie.

genre (String): The movie genre.

releaseYear (Number): The year the movie was released.

rating (Number): The movie rating (defaulted to 0).

The user collection schema includes:

username (String): The user's name.

email (String): The user's unique email address.

password (String): The hashed user password.

role (String): The user's role, which can be "user", "critic", or "admin".

## 5. Basic structure and architecture

Basic Structure and Architecture

The project follows a modular structure with clear separation between the frontend and backend:

Frontend Structure: The React application organizes its code in directories such as components (for reusable UI elements), pages (for view-level components), and styles (for custom CSS). The entry point is in index.js, and the core layout and routing are managed in App.jsx..

Backend Structure: The Express backend is divided into several directories including config (for configuration files), controllers (for business logic), middleware (for authentication and role checking), models (Mongoose schemas), and routes (defining the API endpoints). The main server is launched via index.js..

## 6. Functionalities

Key functionalities implemented in this phase include:

User Authentication: Users can register and log in. After successful authentication, a JWT is issued and stored in localStorage, providing access to protected routes.

Movie Management: Authorized users can add new movies using a structured form, view all movies as responsive cards, and edit or delete movies based on their roles.

Search & Filtering: The homepage includes a search feature to filter movies by title or genre, enhancing the overall user experience.

Error Handling & Validation: All API interactions are wrapped in try/catch blocks to handle errors gracefully, and form validations ensure that necessary fields are completed before submission.

## 7. Code quality and documentation

The project emphasizes a modular and maintainable code structure:

Modular Code Structure: Components and pages are logically separated for reusability.

Consistent Naming Conventions: Naming follows standard practices, with PascalCase for components and kebab-case for directories.

In-Code Documentation: Inline comments explain the functionality of key code blocks, helping with maintenance and onboarding.

Version Control: Git is used for version control with clear commit messages and organized branching strategies.

## 8. Testing and error handling

Robust testing and error handling have been implemented:

Error Handling: API calls and operations incorporate try/catch blocks to provide meaningful error messages.

Form Validation: Frontend forms include required attributes and client-side validation to prevent the submission of incomplete data.

User Feedback: Tools such as SweetAlert2 are used to offer confirmation dialogs (e.g., before deleting a movie), enhancing the user experience.

Testing Approach: The application has undergone unit, integration, and manual testing to ensure reliable functionality.

## 9. User interface and interaction

The application’s user interface is designed for a seamless and engaging experience:

User-Friendly Design: The UI is responsive and intuitive, using a mix of React-Bootstrap components and custom styling.

Reusable Components: Common UI elements like the Navbar and MovieCard are reused across multiple pages, ensuring a consistent look and feel.

Interactive Elements: User interactions such as form submissions, search functionality, and confirmation dialogs are refined to provide clear feedback and an engaging experience.

Navigation and Routing: React Router manages the navigation, ensuring smooth transitions between pages like Login, Register, Add Movie, and Movies List.