/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      boxShadow: {
        glow: "0 20px 80px rgba(255, 122, 0, 0.18)",
      },
    },
  },
  plugins: [],
};
