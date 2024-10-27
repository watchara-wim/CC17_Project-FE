/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ["./src/**/*.{html,jsx}"],
   theme: {
      extend: {
         fontFamily: {
            sans: ["Inter", "sans-serif"],
         },
         colors: {
            brand: {
               blue: "#0d6efd",
               darkgray: "#656565",
               gray: "#d9d9d9",
               white: "#f7f7f6",
               green: "#198754",
               pinegreen: "#37555a",
               crimson: "#dc3545",
               teal: "#5f929b",
            },
         },
      },
   },
   variants: {
      extend: {},
   },
   plugins: [],
};
