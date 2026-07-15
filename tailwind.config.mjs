/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ocean: { DEFAULT: '#4f46e5', deep: '#1e1b4b', light: '#7c6df2' },
        sunset: { DEFAULT: '#7c3aed', pink: '#c026d3', gold: '#a78bfa' },
        sand: '#f5f3ff',
      },
      fontFamily: {
        display: ['"Be Vietnam Pro"', 'system-ui', 'sans-serif'],
        body: ['Inter', '"Be Vietnam Pro"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
