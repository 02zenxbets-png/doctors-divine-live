/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#B91C1C",
          darkred: "#7F1D1D",
          ink: "#111827",
          muted: "#6B7280",
          line: "#E5E7EB",
          bg: "#F9FAFB",
        },
      },
    },
  },
  plugins: [],
};
