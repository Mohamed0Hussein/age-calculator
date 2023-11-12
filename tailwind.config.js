/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        Poppins_Regular:"Poppins_Regular",
        Poppins_Bold:"Poppins_Bold",
        Poppins_BoldItalic:"Poppins_BoldItalic",
        Poppins_ExtraBold:'Poppins_ExtraBold',
        Poppins_ExtraBoldItalic:'Poppins_ExtraBoldItalic',
        Poppins_Italic:'Poppins_Italic'
      }
    },
  },
  plugins: [],
}