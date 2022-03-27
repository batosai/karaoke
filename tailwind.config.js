module.exports = {
  mode: 'jit',
  content: ['./resources/views/**/*.edge', './resources/js/**/*.js', './resources/js/**/*.svelte'],
  darkMode: 'class',
  theme: {
    themeVariants: ['dark'],
  },
  plugins: [require('@tailwindcss/forms'), require('daisyui')],
}
