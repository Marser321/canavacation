/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: '#1A2B50',
        'navy-deep': '#12203D',
        teal: '#0E7A8C',
        'teal-bright': '#00C1CF',
        coral: '#FFAB53',
        alert: '#ED0925',
        bgSoft: '#F7F7F7',
        textBody: '#666666',
        slate: '#5E6D77',
        muted: '#A0A9B2',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'glow-coral': '0 0 15px rgba(255, 171, 83, 0.4)',
        'glow-teal': '0 0 15px rgba(14, 122, 140, 0.4)',
      }
    },
  },
  plugins: [],
}
