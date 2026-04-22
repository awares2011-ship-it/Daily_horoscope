/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './data/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Cinzel Decorative', 'serif'],
        body: ['Nunito', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
      colors: {
        cosmos: {
          50: '#f0eeff',
          100: '#e2dcff',
          200: '#c8bcff',
          300: '#a991ff',
          400: '#8b66ff',
          500: '#6C5CE7',
          600: '#5a47d4',
          700: '#4835b0',
          800: '#3a2b8c',
          900: '#2d2272',
          950: '#1a1244',
        },
        nebula: {
          pink: '#fd79a8',
          purple: '#a29bfe',
          blue: '#74b9ff',
          gold: '#ffeaa7',
          teal: '#55efc4',
        },
        dark: {
          900: '#0a0612',
          800: '#110d1f',
          700: '#1a1530',
          600: '#241d42',
        },
      },
      backgroundImage: {
        'cosmic-gradient': 'linear-gradient(135deg, #0a0612 0%, #1a1530 50%, #110d1f 100%)',
        'card-gradient': 'linear-gradient(135deg, rgba(108,92,231,0.15) 0%, rgba(253,121,168,0.1) 100%)',
        'gold-gradient': 'linear-gradient(135deg, #ffeaa7, #fdcb6e)',
        'streak-gradient': 'linear-gradient(135deg, #fd79a8, #e17055)',
        'hero-glow': 'radial-gradient(ellipse at center, rgba(108,92,231,0.3) 0%, transparent 70%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'star-twinkle': 'twinkle 3s ease-in-out infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.6s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        twinkle: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.3 },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(108,92,231,0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(108,92,231,0.8), 0 0 60px rgba(253,121,168,0.3)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'cosmos': '0 4px 30px rgba(108, 92, 231, 0.3)',
        'cosmos-lg': '0 8px 50px rgba(108, 92, 231, 0.4)',
        'card': '0 8px 32px rgba(0, 0, 0, 0.4)',
        'glow-pink': '0 0 20px rgba(253, 121, 168, 0.5)',
        'glow-purple': '0 0 20px rgba(108, 92, 231, 0.6)',
      },
    },
  },
  plugins: [],
};
