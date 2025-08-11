import React from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../ThemeContext' // 💡 Import theme context
import PulseButton from "../components/PulseButton";
import PulseBeamsButton from '../components/PulseButton';
import HeroSection from '../components/HeroSection';

const LandingPage = () => {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white transition-colors duration-300">
      <div  className="absolute top-3 left-1/2 transform -translate-x-1/2 w-[80%] max-w-5xl px-4 py-2 rounded-full bg-white dark:bg-zinc-900 shadow-md z-50">
        <nav className="flex justify-between items-center p-6">
        <h1 className="text-2xl font-bold">SocialSyncAI</h1>
      
        <div className="flex items-center gap-4">
          {/* 🌙 Toggle Button */}
          <button
            onClick={toggleTheme}
            className="bg-gray-200 dark:bg-gray-700 p-2 rounded focus:outline-none"
            title="Toggle dark/light mode"
          >
            {theme === 'dark' ? '🌞' : '🌙'}
          </button>
      
          <Link to="/login" className="hover:underline">Login</Link>
          <Link to="/signup" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Sign Up
              </Link>
            </div>
          </nav>
      </div>

      {/* Hero Section
      <section className="text-center mt-20 px-6">
        <h2 className="text-4xl font-bold mb-4">
          AI-Generated Content. Auto-Posted. Just for You.
        </h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Automate your personal branding with personalized posts created by AI
          and scheduled to publish on your LinkedIn & Twitter.
        </p>
        <Link to="/signup">
        <PulseBeamsButton type="submit">
          Get Started
        </PulseBeamsButton>
        </Link>
      </section> */}
      <HeroSection></HeroSection>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-6 mt-24 px-10 text-center">
        <div className="p-6 shadow-lg rounded-xl bg-gray-50 dark:bg-gray-800">
          <h3 className="text-xl font-semibold mb-2">🎯 Personalized AI Posts</h3>
          <p>
            Create content in your unique voice using AI trained on your
            preferences.
          </p>
        </div>
        <div className="p-6 shadow-lg rounded-xl bg-gray-50 dark:bg-gray-800">
          <h3 className="text-xl font-semibold mb-2">🕒 Scheduled Auto Posting</h3>
          <p>
            Choose your post time and let our system post daily, weekly or
            custom.
          </p>
        </div>
        <div className="p-6 shadow-lg rounded-xl bg-gray-50 dark:bg-gray-800">
          <h3 className="text-xl font-semibold mb-2">📊 Dashboard Analytics</h3>
          <p>
            Track impressions, engagement, growth and reach — all in one place.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-24 text-center text-sm text-gray-500 dark:text-gray-400 py-4">
        © 2025 SocialSyncAI. All rights reserved.
      </footer>
    </div>
  )
}

export default LandingPage
