import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {}
  },
  // Adds rtl:/ltr: variants used for mirroring layout in Arabic (see components/WhatsAppButton.tsx).
  plugins: [require('tailwindcss-rtl')]
};

export default config;
