import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Plus Jakarta Sans'", "sans-serif"],
        body: ["'Inter'", "sans-serif"]
      },
      colors: {
        midnight: "#0d0f1a",
        neon: "#7f5af0",
        mint: "#2cb67d",
        sky: "#2cb0f5",
        sand: "#f9f4ef"
      },
      backgroundImage: {
        "grid-glow": "radial-gradient(circle at top, rgba(127,90,240,0.25), transparent 55%), radial-gradient(circle at bottom, rgba(44,182,125,0.2), transparent 60%)"
      }
    }
  },
  plugins: []
};

export default config;
