/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "bg-deep": "#050814",
        "surface-dark": "#0E1726",
        "primary-blue": "#38BDF8"
      },
      boxShadow: {
        "glow-blue": "0 0 40px rgba(56, 189, 248, 0.6)"
      },
      borderRadius: {
        "3xl": "1.5rem"
      }
    }
  },
  plugins: []
};
