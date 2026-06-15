const express = require('express');
const { registerUser, loginUser, getCurrentUser } = require('../controllers/authController');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Register route
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);

// Get current user profile
router.get('/me', auth, getCurrentUser);

module.exports = router;