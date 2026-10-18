/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        // Palette officielle DATACOM (provisoire, validee pour electricite + fibre)
        electric: {
          DEFAULT: '#0A4FFF', // Bleu electrique - Pantone 2728 C approx.
          dark: '#0B1F3A',    // Bleu nuit - Pantone 533 C approx.
        },
        safety: {
          DEFAULT: '#FFD100', // Jaune securite - Pantone 108 C approx.
        },
        surface: '#F4F6FA',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        card: '0 8px 30px rgba(11, 31, 58, 0.08)',
      },
    },
  },
  plugins: [],
};
