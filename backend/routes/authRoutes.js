// routes/authRoutes.js
const express = require('express');
const router = express.Router();

const protect = require('../middleware/authMiddleware');
const { signup, login, postGenerate, submitAnswer } = require('../controllers/authControllers');

// Signup
router.post('/signup', signup);

// Login
router.post('/login', login);

// Questionnaire
router.post('/questions', protect, submitAnswer);

// Post generation (should also be protected so only logged-in users can generate posts)
router.post('/postgenerate', protect, postGenerate);

// Protected route for testing
router.get('/protected', protect, (req, res) => {
    res.json({
        message: 'Access granted to protected route!',
        user: req.user
    });
});

module.exports = router;
