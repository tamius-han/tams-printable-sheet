/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      primary: '#f58412',
      'primary-light': '#fac188',
      'primary-dark': '#a98844',
      black: '#000',
      grey: '#888',
      'grey-light': '#aaa',
      'grey-faint': '#ddd',
      white: '#fff',
      damage: {
        fg: {
          fire: '#fda'
        },
        bg: {
          fire: '#ff3311',
          'fire-secondary': '#ff9944',
          lightning: '#5566ff',
          ice: '#ddf',
          acid: '#10080',
          poison: '#11ff55'
        }
      },
      coin: {
        gp: '#b59902',
        sp: '#b2b0b9',
        cp: '#a26832'
      }
    },
    fontFamily: {
      sans: ['Josefin Sans', 'sans-serif'],
      serif: ['IM Fell English']
    },
    extend: {},
  },
  plugins: [],
}

