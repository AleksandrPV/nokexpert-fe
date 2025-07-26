/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  // Оптимизация для production
  corePlugins: {
    preflight: true,
  },
  // Отключаем неиспользуемые плагины
  future: {
    hoverOnlyWhenSupported: true,
  },
}

