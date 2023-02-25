/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#141518'
        },
        secondary: {
          500: '#27292f'
        },
        accent: {
          500: '#f3ef52'
        }
      }
    }
  },
  plugins: []
};
