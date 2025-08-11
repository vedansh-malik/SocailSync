const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Initialize app
const app = express();

// Connect database
connectDB();

app.use(helmet());

// CORS middleware - set properly
app.use(cors({
  origin: 'http://localhost:5174',
  credentials: true,
}));

// Body parsers (very important)
app.use(express.json()); // handles JSON payloads
app.use(express.urlencoded({ extended: true })); // handles form submissions

// Routes
app.use('/api/auth', require('./routes/authRoutes'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {console.log(`Server running on port ${PORT}`)});
