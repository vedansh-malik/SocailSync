// // src/utils/axiosInstance.js
// import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: "http://localhost:5000/api", // Make sure this matches your backend port
//   withCredentials: true,
// });

// export default axiosInstance;

// import axios from 'axios';

// const instance = axios.create({
//   baseURL: 'http://localhost:5000/api',
//   withCredentials: true, // 🔥 Required for CORS
//   headers: {
//     'Content-Type': 'application/json'
//   }
// });

// export default instance;

// src/utils/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api', // adjust if no /api prefix
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 🔐 Attach token dynamically
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
