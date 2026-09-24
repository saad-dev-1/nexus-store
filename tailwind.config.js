/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Base backgrounds
        bg: {
          primary: "#0A0A0A",     // Main near-black
          secondary: "#111111",   // Section bg
          tertiary: "#1A1A1A",    // Card bg
          elevated: "#222222",    // Hover bg
        },
        // Text hierarchy
        text: {
          primary: "#FFFFFF",
          secondary: "#A1A1A1",
          muted: "#666666",
        },
        // Accent (Electric Blue)
        accent: {
          DEFAULT: "#0066FF",
          hover: "#0052CC",
          soft: "rgba(0, 102, 255, 0.1)",
        },
        // Borders
        border: {
          DEFAULT: "rgba(255, 255, 255, 0.08)",
          hover: "rgba(255, 255, 255, 0.16)",
          strong: "rgba(255, 255, 255, 0.24)",
        },
        // Functional
        success: "#22C55E",
        warning: "#F59E0B",
        error: "#EF4444",
        star: "#FBBF24",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        display: ["4.5rem", { lineHeight: "1.05", letterSpacing: "-0.03em", fontWeight: "700" }],
        h1: ["3.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" }],
        h2: ["2.5rem", { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "600" }],
        h3: ["1.75rem", { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "600" }],
        h4: ["1.25rem", { lineHeight: "1.3", letterSpacing: "-0.01em", fontWeight: "600" }],
        body: ["1rem", { lineHeight: "1.6" }],
        small: ["0.875rem", { lineHeight: "1.5" }],
        tiny: ["0.75rem", { lineHeight: "1.4", letterSpacing: "0.08em" }],
      },
      maxWidth: {
        container: "1280px",
      },
            boxShadow: {
        card: "0 4px 24px rgba(0, 0, 0, 0.4)",
        "card-hover": "0 12px 48px rgba(0, 0, 0, 0.6)",
        glow: "0 0 40px rgba(0, 102, 255, 0.15)",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      animation: {
        marquee: "marquee 40s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

