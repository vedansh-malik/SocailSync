// src/App.jsx
import React from 'react'
import { BrowserRouter ,Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import InfluencerQuestionnaire from "./pages/QuestionPage"
import PostGenerator from './pages/DemoPage'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/question" element={<InfluencerQuestionnaire />} />
        <Route path="/demo" element={<PostGenerator />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
