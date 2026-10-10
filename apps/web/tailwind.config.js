/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/shared/src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        alabaster: {
          50: '#FDFDFB',
          100: '#FBFBF9',
          200: '#F4F4F0',
          300: '#ECECE5',
          400: '#DEDECF',
          500: '#C2C2B0',
          600: '#949480',
          700: '#686856',
          800: '#424235',
          900: '#222219'
        },
        obsidian: {
          50: '#F4F4F5',
          100: '#E4E4E7',
          200: '#D4D4D8',
          300: '#A1A1AA',
          400: '#71717A',
          500: '#52525B',
          600: '#3F3F46',
          700: '#27272A',
          800: '#18181B',
          900: '#0D0D10',
          950: '#060608'
        },
        champagne: {
          50: '#FAF7EE',
          100: '#F4EEDA',
          200: '#EADEB5',
          300: '#DECC8F',
          400: '#D3BA6A',
          500: '#C5A059',
          600: '#9F7F3B',
          700: '#775E28',
          800: '#4F3E17',
          900: '#292009'
        }
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Lexend', 'Inter', 'system-ui', 'sans-serif'],
        urdu: ['Noto Nastaliq Urdu', 'serif']
      },
      borderRadius: {
        'pill': '9999px',
        '3xl': '1.5rem',
        '4xl': '2rem'
      },
      boxShadow: {
        'soft': '0 8px 30px rgba(0, 0, 0, 0.04)',
        'luxury': '0 16px 40px -12px rgba(197, 160, 89, 0.18)',
        'elevated': '0 20px 50px -15px rgba(13, 13, 16, 0.08)'
      },
      animation: {
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite'
      },
      keyframes: {
        shimmer: {
          '0%, 100%': { opacity: '0.9', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.02)' }
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' }
        }
      }
    }
  },
  plugins: []
};
