import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Light industrial palette (client-approved). No navy or dark section backgrounds.
        ink: {
          DEFAULT: '#1A1A1A', // headings
          body: '#4A4A4A', // body text
          muted: '#6B6B6B' // labels, captions, secondary text
        },
        line: '#E8E8E8', // card borders and dividers
        surface: {
          alt: '#F7F7F8', // alternate sections
          footer: '#F0F0F0'
        },
        // Accent red. The logo itself is pure #FD0100, which fails contrast for white button
        // text; #C41E24 keeps the logo's hue at a 6.1:1 contrast ratio.
        brand: {
          50: '#FDF2F2',
          100: '#F9E1E2',
          500: '#C41E24',
          600: '#A3181D',
          700: '#82131A'
        }
      }
    }
  },
  // Adds rtl:/ltr: variants used for mirroring layout in Arabic (see components/WhatsAppButton.tsx).
  plugins: [require('tailwindcss-rtl')]
};

export default config;
