/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily:{'poppins':['Poppins','sans-serif']} ,
    extend: {},
    screens: {
      'sm': {'min': '0px', 'max': '830px'},
      'md': {'min': '831px', 'max': '1023px'},
      'lg': {'min': '1024px', 'max': '1500px'},
      'xl': {'min': '1500px', 'max': '2000px'},
      '2xl': {'min': '1536px'},
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
}
