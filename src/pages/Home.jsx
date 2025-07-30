import React from 'react';
import { useNavigate } from 'react-router-dom';

function PatternBG() {
  // SVG pattern background, covers the whole screen
  return (
    <svg className="fixed inset-0 w-full h-full z-0" style={{ pointerEvents: 'none' }} width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="dotPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="2" fill="#3b82f6" opacity="0.12" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dotPattern)" />
    </svg>
  );
}

// Add keyframes for floating animation
const floatAnim = `
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}`;

function Home() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-black via-black to-black overflow-x-hidden font-sans">
      <style>{floatAnim}</style>
      <PatternBG />
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-screen py-24 sm:py-32 box-border overflow-visible relative z-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-white to-white bg-clip-text text-transparent drop-shadow-lg text-center max-w-5xl mx-auto leading-tight">
          Unleash Your Tech Creativity with blogit
        </h1>
        <p className="mt-8 text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto text-center">
          Your go-to platform for creating, sharing, and discovering IT insights.
        </p>
        <button
          onClick={() => navigate('/add-post')}
          className="mt-10 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-blue-500/30 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        >
          Create Blog
        </button>
      </section>

      {/* Features Section as Cards */}
      <section className="py-12 sm:py-16 relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 px-4">
          {/* Feature 1 */}
          <div className="rounded-2xl bg-white/10 backdrop-blur-md p-8 flex flex-col items-center md:items-start text-center md:text-left shadow-xl transition-transform hover:scale-[1.025]">
            <div className="mb-6 flex items-center justify-center h-16 w-16 rounded-full bg-blue-500/20 animate-float" style={{ animation: 'float 3s ease-in-out infinite' }}>
              <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Write. Edit. Share. Inspire.</h2>
            <p className="text-gray-300 text-base sm:text-lg mb-2">
              Express your ideas, connect with like-minded IT enthusiasts, and contribute to the ever-evolving world of technology.
            </p>
          </div>
          {/* Feature 2 */}
          <div className="rounded-2xl bg-white/10 backdrop-blur-md p-8 flex flex-col items-center md:items-start text-center md:text-left shadow-xl transition-transform hover:scale-[1.025]">
            <div className="mb-6 flex items-center justify-center h-16 w-16 rounded-full bg-cyan-500/20 animate-float" style={{ animation: 'float 3.2s ease-in-out infinite' }}>
              <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Hang onto your memories</h2>
            <p className="text-gray-300 text-base sm:text-lg mb-2">
              Safely store thousands of posts, photos, and more in a secure, organized environment.
            </p>
          </div>
          {/* Feature 3 */}
          <div className="rounded-2xl bg-white/10 backdrop-blur-md p-8 flex flex-col items-center md:items-start text-center md:text-left shadow-xl transition-transform hover:scale-[1.025]">
            <div className="mb-6 flex items-center justify-center h-16 w-16 rounded-full bg-purple-500/20 animate-float" style={{ animation: 'float 3.4s ease-in-out infinite' }}>
              <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Discover What's Buzzing in IT</h2>
            <p className="text-gray-300 text-base sm:text-lg mb-2">
              Explore the latest tech trends, tips, and tricks from passionate bloggers and stay ahead in the tech world.
            </p>
          </div>
          {/* Feature 4 */}
          <div className="rounded-2xl bg-white/10 backdrop-blur-md p-8 flex flex-col items-center md:items-start text-center md:text-left shadow-xl transition-transform hover:scale-[1.025]">
            <div className="mb-6 flex items-center justify-center h-16 w-16 rounded-full bg-green-500/20 animate-float" style={{ animation: 'float 3.6s ease-in-out infinite' }}>
              <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Get Started in Minutes</h2>
            <p className="text-gray-300 text-base sm:text-lg mb-4">
              Sign up now and let your voice be heard in the tech community!
            </p>
            <button
              onClick={() => navigate('/add-post')}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-green-500/30 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              Create Blog
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;