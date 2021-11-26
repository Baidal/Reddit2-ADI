module.exports = {
  purge: ['./index.html', './src/**/*.vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'dark-grey': '#1A1A1B',
        'light-grey': '#272729',
        'white-gray': '#f3f3f3',
        'medium-gray': 'rgba(26,26,27,0.8)',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
