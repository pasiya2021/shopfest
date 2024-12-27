module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF6B00', // orange
          dark: '#E65100',
        },
        secondary: {
          DEFAULT: '#003366', // dark blue
          dark: '#001F3F',
        },
        background: {
          light: '#FFFFFF',
          dark: '#1a1a1a',
        }
      }
    }
  },
  plugins: [],
}