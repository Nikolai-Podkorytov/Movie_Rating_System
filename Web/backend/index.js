require('dotenv').config(); // Загружаем переменные среды из .env
const express = require('express');
const { Client } = require('pg'); // Подключение к PostgreSQL
const argon2 = require('argon2'); // Импортируем Argon2 для хэширования паролей

const app = express();
const port = process.env.PORT || 3000;

// Middleware для обработки JSON
app.use(express.json());

// Настройка подключения к PostgreSQL
const client = new Client({
    user: process.env.DB_USER,       // Имя пользователя из .env
    host: process.env.DB_HOST,       // Хост базы данных из .env
    database: process.env.DB_NAME,   // Имя базы данных из .env
    password: process.env.DB_PASSWORD, // Пароль из .env
    port: process.env.DB_PORT,       // Порт из .env
});

// Подключение к базе данных
client.connect()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch(err => console.error('Connection error:', err.stack));

// Главная страница
app.get('/', (req, res) => {
    res.send('Movie Platform Backend is running!');
});

// Маршрут для регистрации пользователя
app.post('/register', async (req, res) => {
    const { username, password } = req.body; // Получаем имя пользователя и пароль
    try {
        const hashedPassword = await argon2.hash(password); // Хэшируем пароль
        const query = 'INSERT INTO users (username, password) VALUES ($1, $2);'; // SQL-запрос для вставки
        await client.query(query, [username, hashedPassword]); // Выполняем запрос
        res.status(201).send('User registered successfully'); // Успешная регистрация
    } catch (err) {
        console.error('Error during registration:', err);
        res.status(500).send('Registration failed'); // Ошибка регистрации
    }
});

// Маршрут для входа пользователя
app.post('/login', async (req, res) => {
    const { username, password } = req.body; // Получаем данные пользователя
    try {
        const query = 'SELECT password FROM users WHERE username = $1;'; // SQL-запрос для получения хэша пароля
        const result = await client.query(query, [username]); // Выполняем запрос

        if (result.rows.length === 0) {
            return res.status(404).send('User not found'); // Пользователь не найден
        }

        const hashedPassword = result.rows[0].password; // Получаем хэш пароля из базы данных
        const match = await argon2.verify(hashedPassword, password); // Проверяем пароль

        if (match) {
            res.status(200).send('Login successful'); // Успех
        } else {
            res.status(401).send('Invalid credentials'); // Неверные данные
        }
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).send('Login failed'); // Ошибка входа
    }
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
