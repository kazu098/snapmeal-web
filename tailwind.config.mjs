/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#357A56',
        'primary-dark': '#2C6E49',
        surface: '#F5FAF7',
        accent: '#FF6B35',
        muted: '#8E8E93',
      },
      fontFamily: {
        sans: ['Inter', 'Hiragino Sans', 'system-ui', 'sans-serif'],
      },
    },
  },
};
