// // routes/authRoutes.js
// const express = require('express');
// const router = express.Router();

// const protect = require('../middleware/authMiddleware');
// const { signup, login, postGenerate, submitAnswer } = require('../controllers/authControllers');

// // Signup
// router.post('/signup', signup);

// // Login
// router.post('/login', login);

// // Questionnaire
// router.post('/questions', protect, submitAnswer);

// // Post generation (should also be protected so only logged-in users can generate posts)
// router.post('/postgenerate', protect, postGenerate);

// // Protected route for testing
// router.get('/protected', protect, (req, res) => {
//     res.json({
//         message: 'Access granted to protected route!',
//         user: req.user
//     });
// });

// router.get("/linkedinLogin", protect, linkedinLogin);
// router.get("/callback", protect, linkedinCallback);
// router.post("/post", protect, linkedinPost);

// module.exports = router;


const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  submitAnswer,
  postGenerate,
  loginWithLinkedIn,
  linkedinCallback,
  postToLinkedIn
} = require("../controllers/authControllers");
const protect = require("../middleware/authMiddleware");

// Auth
router.post("/signup", signup);
router.post("/login", login);

// Questionnaire
router.post("/questions", protect, submitAnswer);

// Post generation
router.post("/postgenerate", protect, postGenerate);

// LinkedIn Integration
router.get("/linkedin", loginWithLinkedIn);  
router.get("/linkedin/callback", linkedinCallback); 
router.post("/linkedin/post", protect, postToLinkedIn);  

module.exports = router;
