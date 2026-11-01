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
          // Photo combo only: Midnight Black, Electric Blue, Cantaloupe Orange.
          midnight: "#02070A",
          surface: "#0A1017",
          electric: "#0287DE",
          electricdark: "#0268AC",
          cantaloupe: "#FC734D",
          ink: "#FFFFFF",
          muted: "#9AA7B4",
          line: "#1E2836",
        },
      },
    },
  },
  plugins: [],
};
