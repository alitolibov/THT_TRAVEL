/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        lt: '580px',
        sm: '650px',
        md: '768px',
        lg: '1024px',
        xl: '1200px',
        xxl: '1440px'
      },
      backgroundSize: {
         full: '100%',
          org: '110%',
      }
    },
  },
  plugins: [],
}
