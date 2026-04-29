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
        pokemon: {
          red: '#DC143C',
          blue: '#4169E1',
          yellow: '#FFD700',
          green: '#228B22',
          purple: '#9370DB',
        },
      },
    },
  },
  plugins: [],
}
