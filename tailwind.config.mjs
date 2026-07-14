/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ocean: { DEFAULT: '#0a4d68', deep: '#05263a', light: '#088395' },
        sunset: { DEFAULT: '#ff6b35', pink: '#ff2e93', gold: '#ffb703' },
        sand: '#fef6e4',
      },
      fontFamily: {
        display: ['"Be Vietnam Pro"', 'system-ui', 'sans-serif'],
        body: ['Inter', '"Be Vietnam Pro"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
