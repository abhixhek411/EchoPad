import React from 'react'
import { Container, PostForm } from '../components'

function PatternBG() {
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

function AddPost() {
  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-black via-black to-black overflow-x-hidden font-sans flex items-center justify-center">
      <PatternBG />
      <div className="relative z-10 w-full flex items-start justify-center min-h-screen mt-24 sm:mt-32 px-2 sm:px-4 gap-8">
        <div className="w-full max-w-lg lg:max-w-5xl mx-auto bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-cyan-200 p-4 sm:p-8 lg:p-12 flex flex-col">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 text-center mb-10">
            Create New Post
          </h1>
          <PostForm />
        </div>
      </div>
    </div>
  )
}

export default AddPost