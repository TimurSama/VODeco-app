/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'deep-blue': '#0a192f',
        'eco-green': '#00b894',
        'eco-blue': '#00cec9',
        'night-blue': '#2d3436',
        'neon-blue': '#00F5FF',
        primary: {
          DEFAULT: '#0ea5e9',
          dark: '#0284c7',
        },
        secondary: {
          DEFAULT: '#10b981',
          dark: '#059669',
        },
        'neon-mint': '#00FFD1',
        'glass': 'rgba(255, 255, 255, 0.1)',
      },
      backgroundImage: {
        'gradient-dark': 'linear-gradient(to bottom, #0A192F, #000000)',
        'gradient-eco': 'linear-gradient(135deg, #00cec9, #00b894)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'bubble': 'bubble 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        bubble: {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-20px) scale(1.1)' },
        },
      },
      boxShadow: {
        'eco': '0 4px 6px -1px rgba(0, 206, 201, 0.1), 0 2px 4px -1px rgba(0, 184, 148, 0.06)',
        'eco-hover': '0 8px 12px -1px rgba(0, 206, 201, 0.2), 0 4px 6px -1px rgba(0, 184, 148, 0.12)',
      },
    },
  },
  plugins: [],
} 