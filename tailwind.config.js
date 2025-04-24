/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        header: 'var(--color-header)',
        text: 'var(--color-text)',
        hover: 'var(--color-hover)',
        btn: 'var(--color-btn)',
        hoverBtn : 'var(--color-btn-hover)',
        border: 'var(--color-border)',
      } 
    },
  },
  plugins: [],
}
