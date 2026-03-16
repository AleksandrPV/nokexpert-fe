/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#2563EB',
          'primary-dark': '#1D4ED8',
          'primary-light': '#DBEAFE',
          accent: '#DC2626',
          'accent-dark': '#B91C1C',
          dark: '#0F172A',
          text: '#334155',
          muted: '#64748B',
          border: '#E2E8F0',
          'bg-alt': '#F8FAFC',
          surface: '#FFFFFF',
        },
      },
    },
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
