import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        gold: {
          50:  "#fdf8ee",
          100: "#f9edcc",
          200: "#f2d895",
          300: "#e9be58",
          400: "#C5A059",
          500: "#b8892e",
          600: "#9e6d23",
          700: "#7f521f",
          800: "#68401f",
          900: "#57361c",
          950: "#321b0b",
        },
        stone: {
          950: "#0C0A09",
          900: "#1C1917",
          800: "#292524",
          700: "#44403C",
          600: "#57534E",
          500: "#78716C",
          400: "#A8A29E",
          300: "#D6D3D1",
          200: "#E7E5E4",
          100: "#F5F5F4",
          50:  "#FAFAF9",
        },
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        sans:    ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "10xl": ["10rem",  { lineHeight: "1", letterSpacing: "-0.04em" }],
        "9xl":  ["8rem",   { lineHeight: "1", letterSpacing: "-0.03em" }],
        "8xl":  ["6rem",   { lineHeight: "1", letterSpacing: "-0.03em" }],
      },
      backgroundImage: {
        "gold-shimmer":
          "linear-gradient(90deg, transparent 0%, rgba(197,160,89,0.15) 50%, transparent 100%)",
        "gold-gradient":
          "linear-gradient(135deg, #C5A059 0%, #D4B57A 50%, #9E7D3F 100%)",
        "hero-overlay":
          "radial-gradient(ellipse at center, rgba(12,10,9,0.4) 0%, rgba(12,10,9,0.85) 100%)",
        "card-overlay":
          "linear-gradient(to top, rgba(12,10,9,0.95) 0%, rgba(12,10,9,0.5) 40%, transparent 70%)",
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        shimmer:   "shimmer 2.5s infinite linear",
        pulse_slow: "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float:     "float 6s ease-in-out infinite",
        ripple:    "ripple 2s ease-out infinite",
      },
      keyframes: {
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":      { transform: "translateY(-8px)" },
        },
        ripple: {
          "0%":   { transform: "scale(1)",   opacity: "0.4" },
          "100%": { transform: "scale(2.2)", opacity: "0" },
        },
      },
      transitionTimingFunction: {
        luxury: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      transitionDuration: {
        "400": "400ms",
        "600": "600ms",
        "800": "800ms",
        "1200": "1200ms",
      },
      spacing: {
        "18":  "4.5rem",
        "88":  "22rem",
        "100": "25rem",
        "112": "28rem",
        "128": "32rem",
      },
      borderWidth: {
        "0.5": "0.5px",
      },
      boxShadow: {
        gold:    "0 0 24px rgba(197, 160, 89, 0.25)",
        "gold-lg": "0 0 48px rgba(197, 160, 89, 0.2)",
        "card":  "0 8px 32px rgba(0, 0, 0, 0.4)",
        "card-hover": "0 16px 48px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(197, 160, 89, 0.15)",
        "glass": "inset 0 1px 0 rgba(255,255,255,0.06), 0 4px 24px rgba(0,0,0,0.3)",
      },
    },
  },
  plugins: [],
};

export default config;
