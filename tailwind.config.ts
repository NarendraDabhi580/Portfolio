import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "space-dark": "#03050f",
        "space-void": "#060a1a",
        "nebula-blue": "#0d1b3e",
        "electric-cyan": "#00e5ff",
        "plasma-violet": "#7c3aed",
        "neon-green": "#00ff88",
        "star-white": "#e8f4fd",
        "cosmic-purple": "#4c1d95",
        "aurora-pink": "#f72585",
        "deep-space": "#080c20",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
        display: ["var(--font-outfit)", "sans-serif"],
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "glow-pulse": "glowPulse 2s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
        "nebula": "nebula 8s ease-in-out infinite alternate",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.7", filter: "blur(8px)" },
          "50%": { opacity: "1", filter: "blur(12px)" },
        },
        nebula: {
          from: { backgroundPosition: "0% 50%" },
          to: { backgroundPosition: "100% 50%" },
        },
      },
      backgroundImage: {
        "cosmic-gradient":
          "radial-gradient(ellipse at 10% 20%, #0d1b3e 0%, #03050f 50%, #060a1a 100%)",
        "aurora-gradient":
          "linear-gradient(135deg, #00e5ff22 0%, #7c3aed22 50%, #f7258522 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
