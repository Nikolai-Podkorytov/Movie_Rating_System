const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');
const { getAllUsers, updateUserRole, deleteUser } = require('../controllers/adminControllers');

// Apply auth and role check to all admin routes
router.use(auth);
router.use(checkRole(['admin']));

// Admin user management
router.get('/users', getAllUsers);
router.patch('/users/:id', updateUserRole);
router.delete('/users/:id', deleteUser);

module.exports = router;
