/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1C1C1E", // Encre
        accent: "#E8634A", // Corail
        background: "#FAFAFA", // Neige
        textDark: "#2D2D2D", // Graphite
      },
      fontFamily: {
        title: ["Plus Jakarta Sans", "sans-serif"],
        dramatic: ["Cormorant Garamond", "serif"],
        data: ["IBM Plex Mono", "monospace"],
      },
      borderRadius: {
        '2rem': '2rem',
        '3rem': '3rem',
        '4rem': '4rem',
      }
    },
  },
  plugins: [],
}
