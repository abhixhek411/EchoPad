import React from 'react'
import { Signup as SignupComponent } from '../components'

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

function Signup() {
    return (
        <div className="relative min-h-screen w-full bg-gradient-to-br from-black via-black to-black overflow-x-hidden font-sans flex items-center justify-center">
            <PatternBG />
            <div className="relative z-10 w-full px-2 sm:px-4 md:px-0 max-w-md sm:max-w-lg lg:max-w-xl mx-auto flex flex-col items-center justify-center min-h-screen mt-24 sm:mt-32">
                <SignupComponent />
            </div>
        </div>
    )
}

export default Signup