module.exports = {
  mode: 'jit',
  content: ['./resources/views/**/*.edge', './resources/js/**/*.js', './resources/js/**/*.svelte'],
  darkMode: 'class',
  theme: {
    themeVariants: ['dark', 'light'],
  },
  // plugins: [require('@tailwindcss/forms'), require('daisyui')],
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
}
