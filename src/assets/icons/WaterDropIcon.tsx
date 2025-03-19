import React from 'react';

interface WaterDropIconProps {
  className?: string;
  color?: string;
}

const WaterDropIcon: React.FC<WaterDropIconProps> = ({ className = '', color = 'currentColor' }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Основная капля */}
      <path
        d="M12 3.5C12 3.5 16 7.5 16 12C16 16.4183 12.4183 20 8 20C3.58172 20 0 16.4183 0 12C0 7.5 4 3.5 4 3.5"
        fill="url(#logo-gradient)"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Блик */}
      <path
        d="M5 8C5 8 7 10 7 12C7 14 6 15 5 15.5"
        stroke="white"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.6"
      />
      {/* Градиент */}
      <defs>
        <linearGradient id="logo-gradient" x1="8" y1="3.5" x2="8" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3498db"/>
          <stop offset="1" stopColor="#2980b9"/>
        </linearGradient>
      </defs>
    </svg>
  );
};

export default WaterDropIcon; 