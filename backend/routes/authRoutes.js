// routes/authRoutes.js
const express = require('express');
const router = express.Router();

// import { createSchedule } from '../controllers/scheduleController.js';
const protect = require('../middleware/authMiddleware');
const { signup, login, postGenerate, submitAnswer } = require('../controllers/authControllers');

// @route   POST /api/auth/signup
// @desc    Register new user
router.post('/signup', signup);

// @route   POST /api/auth/login
// @desc    Login user
router.post('/login', login);

router.post('/questions', protect , submitAnswer);

router.post('/postgenerate', postGenerate);

// router.post('/create', createSchedule);

const protect = require('../middleware/authMiddleware');

// Add this route at the end of your existing routes: just for temporary
router.get('/protected', protect, (req, res) => {
    res.json({
        message: 'Access granted to protected route!',
        user: req.user
    });
});


module.exports = router;
