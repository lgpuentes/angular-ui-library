/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./projects/**/*.{html,ts}",],
  theme: {
    extend: {
      colors: {
        space: {
          950: '#080b12',
          900: '#101722',
          800: '#182332',
          700: '#253449',
        },
        portal: {
          DEFAULT: '#97ce4c',
          light: '#c5f477',
          dark: '#5d9630',
        },
        nebula: {
          DEFAULT: '#6741a5',
          light: '#9870d4',
          dark: '#39245e',
        },
        dimension: {
          DEFAULT: '#2589C7',
          light: '#55B8ED',
          dark: '#15547D',
        },
        plasma: '#42d9e8',
        starlight: '#e9f1e8',
        muted: '#9aa9b8',
      },
      fontFamily: {
        display: ['Bangers', 'cursive'],
        body: ['Inter', 'sans-serif'],
        mono: ['monospace'],
      },
      boxShadow: {
        portal: '0 0 25px rgba(151, 206, 76, 0.20)',
        nebula: '0 0 25px rgba(103, 65, 165, 0.25)',
      },
    },
  },
  plugins: [],
}

