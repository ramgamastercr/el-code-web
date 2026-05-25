/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts}',
    './public/index.html',
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          DEFAULT: '#00FF9C',
          dim: '#00D084',
          bright: '#19FFB2',
        },
        darkbg: {
          DEFAULT: '#000000',
          soft: '#0B0B0B',
          mid: '#111111',
        },
        chrome: {
          DEFAULT: '#C0C0C0',
          light: '#E5E5E5',
          dark: '#8F8F8F',
        },
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        grotesk: ['Space Grotesk', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-neon': 'pulse-neon 2.5s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'blink': 'blink 1s step-end infinite',
        'scan-down': 'scan-down 10s linear infinite',
      },
      keyframes: {
        'pulse-neon': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0,255,156,0.4), 0 0 40px rgba(0,255,156,0.15)' },
          '50%': { boxShadow: '0 0 40px rgba(0,255,156,0.8), 0 0 80px rgba(0,255,156,0.4), 0 0 120px rgba(0,255,156,0.15)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'scan-down': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
    },
  },
  plugins: [],
};
