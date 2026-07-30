import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Petróleo + sage — identidade visual (Dra. Juliana Trindade)
        brand: {
          50: "#EDF0E4",
          100: "#DCE3CE",
          200: "#C7D3B6",
          300: "#93A87D",
          400: "#6B8A5A",
          500: "#3F5A45",
          600: "#12302E",
          700: "#0F2925",
          800: "#0C221F",
          900: "#091917",
        },
        // Terracota — cor de ação (CTAs)
        accent: {
          50: "#FBEAE3",
          100: "#F5D1C2",
          200: "#E9A688",
          300: "#DB7E56",
          400: "#CB6338",
          500: "#C1552B",
          600: "#A3451F",
          700: "#8F3E1F",
          800: "#6E301A",
          900: "#4D2113",
        },
        // Areia — fundos claros
        cream: {
          DEFAULT: "#FBF7EF",
          100: "#F3EFE4",
        },
        // Tons de texto (verde-acinzentado, não azulado)
        ink: {
          DEFAULT: "#1C2523",
          600: "#3A4744",
          500: "#5B6D68",
          400: "#7A8B84",
        },
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      fontFamily: {
        sans: ["var(--font-public-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-lora)", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
