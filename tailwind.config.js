/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // Ensure Tailwind scans all components
  theme: {
    extend: {
      colors: {
        background: "#ffffff", // White background (matches reference project)
        foreground: "#1a1a1a", // Dark text (matches reference project)
      },
    },
  },
  plugins: [],
};
