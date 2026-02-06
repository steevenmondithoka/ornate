/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // You can add your "Ornate" specific colors here later
      colors: {
        ornateGold: '#D4AF37',
        ornateDark: '#020617',
      }
    },
  },
  plugins: [],
}