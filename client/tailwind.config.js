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
        'line-gray': '#343536',
        'border-gray': '#474748',
        'text-gray': '#d7dadc',
        'meta-text': '#818384'
      },
      outline: {
        gray: ['2px dashed rgba(26,26,27,0.8)', '-10px']
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
