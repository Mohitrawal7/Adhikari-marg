/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        blob: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        },
      },
      animation: {
        blob: "blob 8s infinite",
        "blob-delay-2000": "blob 8s infinite 2s",
        "blob-delay-4000": "blob 8s infinite 4s",
      },
      colors: {
        primary: '#2e7bf7', 
        'blue-gradient-start': '#2e7bf7', 
        'blue-gradient-end': '#3a66f1',   
        'gray-bg': '#f5f7fa', 
        'table-header-bg': '#f8f9fa', 
        'dark-text': '#333e63',
        'light-gray-text': '#7a819b', 
        'light-blue': '#e0f2fe', 
        'gray-text': '#7a819b', 
        'light-gray-bg': '#f5f7fa',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Or 'Poppins', 'Roboto', etc.
      },
    },
  },
  plugins: [],
}