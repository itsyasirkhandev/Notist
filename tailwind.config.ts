import type { Config } from 'tailwindcss';

/*
 * Tailwind CSS v4 Configuration
 * Most theme configuration is now in src/app/globals.css using @theme directive.
 * This file is kept minimal for container settings and dark mode.
 */
export default {
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
  },
} satisfies Config;
