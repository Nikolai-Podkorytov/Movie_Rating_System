require('dotenv').config(); // Загрузка переменных из .env
const express = require('express');
const { Client } = require('pg');
const argon2 = require('argon2');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // Обработка JSON-запросов

// Подключение к PostgreSQL
const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

client.connect()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch(err => console.error('Connection error:', err.stack));

// Главная страница
app.get('/', (req, res) => {
    res.send('Movie Platform Backend is running!');
});

// Регистрация
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await argon2.hash(password);
        const query = 'INSERT INTO users (username, password) VALUES ($1, $2);';
        await client.query(query, [username, hashedPassword]);
        res.status(201).send('User registered successfully');
    } catch (err) {
        console.error('Error during registration:', err);
        res.status(500).send('Registration failed');
    }
});

// Вход
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const query = 'SELECT password FROM users WHERE username = $1;';
        const result = await client.query(query, [username]);

        if (result.rows.length === 0) {
            return res.status(404).send('User not found');
        }

        const hashedPassword = result.rows[0].password;
        const match = await argon2.verify(hashedPassword, password);

        if (match) {
            res.status(200).send('Login successful');
        } else {
            res.status(401).send('Invalid credentials');
        }
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).send('Login failed');
    }
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
