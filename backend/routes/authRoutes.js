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
