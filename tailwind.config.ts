import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Navy carried over from the old site's skin (#25255a); accent red from the Santura logo.
        navy: {
          950: '#0c0d26',
          900: '#13143a',
          800: '#1b1c4a',
          700: '#25255a',
          600: '#34357a',
          100: '#e6e7f3'
        },
        brand: {
          500: '#e3151f',
          600: '#c3101a',
          50: '#fdecec'
        }
      }
    }
  },
  // Adds rtl:/ltr: variants used for mirroring layout in Arabic (see components/WhatsAppButton.tsx).
  plugins: [require('tailwindcss-rtl')]
};

export default config;
