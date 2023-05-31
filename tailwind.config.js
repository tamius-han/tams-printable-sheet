/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      primary: '#f58412',
      black: '#000',
      grey: '#888',
      'grey-light': '#aaa',
      white: '#fff',
    },
    fontFamily: {
      sans: ['Josefin Sans', 'sans-serif'],
      serif: ['IM Fell English']
    },
    extend: {},
  },
  plugins: [],
}

