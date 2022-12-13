module.exports = {
  content: [
    './App.tsx',
    './src/**/*.tsx'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#10DC49',
        darkPrimary: '#0CA236',
        font: '#212C24',
        fontLight: '#717873',
        desc: '#B6C3B9',
        wrong: '#EE3354',
        stroke: '#E3E8E4'
      }
    },
  },
  plugins: [],
  corePlugins: require('tailwind-rn/unsupported-core-plugins'),
}
