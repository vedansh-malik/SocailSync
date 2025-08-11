// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    // Check if token is sent in Authorization header as: Bearer <token>
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Attach user to request (you can exclude password if needed)
            req.user = await User.findById(decoded.id).select('-password');

            next(); // move to next middleware or controller
        } catch (error) {
            console.error('Auth Error:', error.message);
            return res.status(401).json({ message: 'Invalid or expired token.' });
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, token missing.' });
    }
};

module.exports = protect;
