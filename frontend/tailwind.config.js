import animate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  darkMode: "selector",
  theme: {
    extend: {
      colors: {
        primary: "#135bec",
        "background-light": "#ffffff", // Changed from "#f6f6f8"
        "background-dark": "#101622",
        // TailAdmin colors
        stroke: '#E2E8F0',
        strokedark: '#2E3A47',
        boxdark: '#24303F',
        'boxdark-2': '#1A222C',
        'meta-2': '#EFF2F7',
        'meta-4': '#313D4A',
        secondary: '#80CAEE',
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px",
      },
    },
  },
  plugins: [animate],
}
