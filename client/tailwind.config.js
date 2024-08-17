/** @type {import('tailwindcss').Config} */
export default {
  content: [    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
],
theme: {
  extend: {
    boxShadow: {
      'custom-light': '2px 2px 4px rgba(0, 0, 0, 0.1)',
      'custom-dark': '4px 4px 8px rgba(0, 0, 0, 0.3)',
    },
  },
},
  plugins: [],
}