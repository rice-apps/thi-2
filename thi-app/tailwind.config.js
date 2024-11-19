/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['app/**/*.{js,jsx,ts,tsx}', 'components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  plugins: [],
  theme: {
    extend: {
      fontFamily: {
        jost: ['Jost-VariableFont_wght', 'sans-serif'],
      },
      fontWeight: {
        thin: 100,
        light: 300,
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
      },
    },
  },
}
