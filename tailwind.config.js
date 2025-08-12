/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        // Apply styles up to and including 425px
        vs: { max: '425px' },
        // (optional) a min-width twin if you ever need “from 425px and up”
        xs: '425px',
      },
      boxShadow: {
        'pink-bottom': '0 4px 6px -1px #ec4899',
        'green-bottom': '0 4px 6px -1px #01DB75',
        'blue-bottom': '0 4px 6px -1px #3b82f6',
        'purple-bottom': '0 4px 6px -1px #8b5cf6',
        'red-bottom': '0 4px 6px -1px #ef4444',
      },
      colors: {
        green: {
          400: '#01DB75',
          500: '#01DB75',
          600: '#00C766',
          700: '#00B35C',
        },
        gray: {
          900: '#1A1A1A',
        },
      },
      width: {
        44: '176px', // 👈 custom w-44 (overrides default)
      },
    },
  },
  plugins: [],
};
