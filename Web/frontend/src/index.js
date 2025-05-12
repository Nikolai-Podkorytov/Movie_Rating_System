import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // импортируем BrowserRouter
import App from './App';
import './index.css'; // если используется файл стилей

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
