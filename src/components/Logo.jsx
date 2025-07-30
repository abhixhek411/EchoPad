import React from 'react';

const Logo = ({ className = '', size = 48 }) => (
  <svg
    width={size * 3.5}
    height={size}
    viewBox="0 0 168 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ display: 'inline-block', verticalAlign: 'middle' }}
  >
    <defs>
      {/* Icon gradient (blue-teal for vibrancy) */}
      <linearGradient id="icon-gradient" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0ea5e9" /> {/* Sky Blue */}
        <stop offset="1" stopColor="#6366f1" /> {/* Indigo */}
      </linearGradient>

      {/* Text gradient (balanced for light/dark) */}
      <linearGradient id="text-gradient" x1="0" y1="0" x2="180" y2="0" gradientUnits="userSpaceOnUse">
        <stop stopColor="#14b8a6" /> {/* Teal */}
        <stop offset="1" stopColor="#6366f1" /> {/* Indigo */}
      </linearGradient>
    </defs>

    {/* Icon */}
    <g>
      <circle cx="24" cy="24" r="20" fill="url(#icon-gradient)" />
      <text
        x="18"
        y="31"
        fontFamily="'Segoe UI', Arial, sans-serif"
        fontSize="20"
        fontWeight="700"
        fill="#ffffff"
      >
        b
      </text>
    </g>

    {/* Text */}
    <text
      x="60"
      y="32"
      fontFamily="'Segoe UI', Arial, sans-serif"
      fontSize="26"
      fontWeight="600"
      fill="url(#text-gradient)"
    >
      blogit
    </text>
  </svg>
);

export default Logo;
