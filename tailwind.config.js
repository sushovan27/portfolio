/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        mob: "360px",
        tab: "640px",
        md: "768px",
        lg: "1024px",
        mh: "1440px",
      },
      colors: {
        surface: "#F3F2EF",
        "surface-paper": "#FAF9F6",
        "surface-card": "#FAF9F6",
        "surface-container": "#EFEEEB",
        "surface-dark": "#111317",
        "surface-dark-elevated": "#1A1C21",
        "text-primary": "#17181B",
        "text-on-dark": "#F4F3F0",
        "text-muted": "#777A80",
        "text-on-dark-muted": "#A8A9AE",
        "border-subtle": "#D5D6D7",
        "border-strong": "#B8B9BC",
        "border-dark": "#282B32",
        "accent-amber": "#FF793D",
        "accent-amber-soft": "rgba(255, 121, 61, 0.12)",
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        sans: ["Inter", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
        editorial: ["Newsreader", "serif"],
      },
      boxShadow: {
        soft: "0 18px 48px rgba(20, 22, 26, 0.08)",
        object: "0 28px 80px rgba(15, 18, 24, 0.18)",
        "2xs": "0 1px 2px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [],
};