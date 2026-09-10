/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#FAF5FF',
          100: '#F3E8FF',
          200: '#E9D5FF',
          300: '#D8B4FE',
          400: '#C084FC',
          500: '#A855F7',
          600: '#9333EA',
          700: '#7E22CE',
          800: '#6B21A8',
          900: '#581C87',
          950: '#3B0764',
        }
      },
      boxShadow: {
        'purple-sm': '0 2px 8px -1px rgba(126, 34, 206, 0.08), 0 1px 4px -1px rgba(126, 34, 206, 0.04)',
        'purple-md': '0 8px 24px -4px rgba(126, 34, 206, 0.12), 0 4px 12px -2px rgba(126, 34, 206, 0.08)',
        'purple-lg': '0 16px 36px -6px rgba(126, 34, 206, 0.18), 0 6px 16px -3px rgba(126, 34, 206, 0.1)',
        'glow': '0 0 20px rgba(168, 85, 247, 0.35)',
      }
    },
  },
  plugins: [],
}
