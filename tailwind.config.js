/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Ocean-inspired palette
        ocean: {
          50: '#f0fafb',
          100: '#d0f0f4',
          200: '#a1e0e9',
          300: '#6ac8d7',
          400: '#3aabb',
          500: '#1d8a9c',    // Primary teal
          600: '#186f80',
          700: '#175a68',
          800: '#184a56',
          900: '#193f49',
        },
        sand: {
          50: '#fdfcf9',
          100: '#f9f5ed',
          200: '#f2e8d5',
          300: '#e8d5b5',
          400: '#dbbe91',
          500: '#d0a76f',
          600: '#c28e53',
          700: '#a17243',
          800: '#835d3b',
          900: '#6b4d33',
        },
        coral: {
          50: '#fff5f2',
          100: '#ffe8e1',
          200: '#ffd5c8',
          300: '#ffb5a1',
          400: '#ff8c6e',    // Accent coral
          500: '#f06840',
          600: '#dd4f26',
          700: '#b93e1c',
          800: '#99351c',
          900: '#7e301d',
        },
        // Accessibility badge colors
        verified: '#16a34a',    // Green for verified
        unverified: '#d97706',  // Amber for unverified
      },
      fontFamily: {
        display: ['Libre Baskerville', 'Georgia', 'serif'],
        body: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(180deg, rgba(25, 63, 73, 0.6) 0%, rgba(25, 63, 73, 0.2) 50%, rgba(25, 63, 73, 0) 100%)',
      },
    },
  },
  plugins: [],
};
