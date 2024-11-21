/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      boxShadow: {
        'top-bottom': '0 -4px 6px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.1)',       
        'left-right': '-0px 0  6px rgba(0, 0, 0, 0.1), 0px 0 6px rgba(0, 0, 0, 0.1)',       
      },
      
      colors : {

        Neutral : {
        darkBlue : "hsl(209, 23%, 22%)",
        veryDarkBlue : "hsl(207, 26%, 17%)",
        veryLightMode : " hsl(200, 15%, 8%)",
        darkGray : " hsl(0, 0%, 52%)",
        veryLightGray : "hsl(0, 0%, 98%)",
        white : "hsl(0, 0%, 100%)",
        }

      },
      


      fontFamily : {
      customFont: ["Nunito Sans","sans-serif"],
      },

      


      fontWeight : {
        light: 300,
        semibold: 600,
        extrabold: 800,
      }
      

    },

    
  },
  plugins: [],
}