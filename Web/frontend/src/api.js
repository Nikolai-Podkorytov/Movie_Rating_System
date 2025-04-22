import axios from 'axios';

const api = axios.create({
  baseURL: process.env.movie-rating-system-nmfw.onrender.com/api || 'http://localhost:3000/api'
});

export default api;