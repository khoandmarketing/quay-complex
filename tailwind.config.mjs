/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ocean: { DEFAULT: '#3d2f9e', deep: '#160f4d', light: '#8b7ec8' },
        sunset: { DEFAULT: '#b32aa0', pink: '#e23bd0', gold: '#f0a6ff' },
        sand: '#f3eefc',
      },
      fontFamily: {
        display: ['"Be Vietnam Pro"', 'system-ui', 'sans-serif'],
        body: ['Inter', '"Be Vietnam Pro"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
