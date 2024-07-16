/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors:{
        "black-bg":"rgb(27 27 33)",
        "login-bg":"rgb(17 17 20);",
        "input-bg":"rgb(17 17 20);",
        "blue-btn":"rgb(33 133 90);",
        "dark-blue-btn":"rgb(14 75 49);",
        "light-input-bg":"rgb(27 27 33);"
      },
      screens:{
        'sm':"200px"
      }
      
    },
  },
  plugins: [],
};
