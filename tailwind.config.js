/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./ui/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        // display: ["plus_jakarta_sans", "system-ui", "sans-serif"],
        default: ["var(--font-inter)", "system-ui", "sans-serif"],
        // plus_jakarta_sans: ["Plus Jakarta Sans", "sans-serif"],
      },
    },
  },
  plugins: [
    // Tailwind plugins
    require("@tailwindcss/typography"),
    require("tailwindcss-animate"),
    require("@tailwindcss/forms"),
  ],
  darkMode: "class",
};
