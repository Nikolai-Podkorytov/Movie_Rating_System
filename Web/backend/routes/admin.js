const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole'); // Middleware, который принимает массив ролей
const { getAllUsers, updateUserRole, deleteUser } = require('../controllers/adminControllers');

// Все маршруты администрирования доступны только для admin
router.use(auth);
router.use(checkRole(['admin']));

router.get('/users', getAllUsers);
router.patch('/users/:id', updateUserRole);
router.delete('/users/:id', deleteUser);

module.exports = router;
