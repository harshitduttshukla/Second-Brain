/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          100: "#eeeeef",
          200: "#e6e9ed",
          600: "#95989c",
        },
        purple: {
          200: "#d9ddee",
          500: "9492db",
          600: "#7164c0",
        },
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': {
            textShadow: '0 0 6px rgba(139, 92, 246, 0.7)',
          },
          '50%': {
            textShadow: '0 0 20px rgba(139, 92, 246, 1)',
          },
        },
      },
      animation: {
        pulseGlow: 'pulseGlow 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
