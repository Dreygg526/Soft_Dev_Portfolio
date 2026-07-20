import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep, cinematic base (avoid pure #000 — OLED smear per design system)
        base: {
          900: "#05070E", // page background
          800: "#0A0E1A", // section background
          700: "#0F172A", // elevated surface
          600: "#151C31", // card surface
        },
        line: "#1E2A44", // hairline borders
        // Neon accents (futuristic AI direction)
        neon: {
          cyan: "#22D3EE",
          blue: "#3B82F6",
          violet: "#A855F7",
          magenta: "#EC4899",
        },
        ink: {
          100: "#F8FAFC", // primary text
          300: "#CBD5E1", // secondary text
          500: "#94A3B8", // muted text
          600: "#64748B", // faint text
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(34,211,238,0.45)",
        "glow-violet": "0 0 40px -8px rgba(168,85,247,0.45)",
        card: "0 20px 60px -30px rgba(0,0,0,0.9)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "spin-slow": "spin-slow 24s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
