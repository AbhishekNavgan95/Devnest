/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
      colors: {
        main: {
          50: "#A5AEE9",
          100: "#949FE5",
          200: "#7482DD",
          300: "#5768D6",
          400: "#364ACE",
          500: "#2B3DB0",
          600: "#23328F",
          700: "#1B266F",
          800: "#141C52",
          900: "#0C1131",
          950: "#080B21",
        },
        second: {
          50: "#F4F4FA",
          100: "#EAEAF6",
          200: "#D1D1EB",
          300: "#B1B1DD",
          400: "#8E8ECD",
          500: "#5252B3",
          600: "#4949A7",
          700: "#414195",
          800: "#30306E",
          900: "#22224E",
          950: "#161632",
        },
        dark: {
          50: "#F2F2F2",
          100: "#EDEDED",
          200: "#E0E0E0",
          300: "#D4D4D4",
          400: "#C4C4C4",
          500: "#B3B3B3",
          600: "#A1A1A1",
          700: "#8A8A8A",
          800: "#6B6B6B",
          900: "#404040",
          950: "#000000",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
