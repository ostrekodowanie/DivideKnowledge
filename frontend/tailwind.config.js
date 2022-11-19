module.exports = {
  content: [
    './App.tsx',
    './src/**/*.tsx'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#8A2BE2'
      }
    },
  },
  plugins: [],
  corePlugins: require('tailwind-rn/unsupported-core-plugins'),
}
