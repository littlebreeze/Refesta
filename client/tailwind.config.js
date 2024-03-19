/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ourPink: '#F6648B',
        ourIndigo: '#061E58',
        ourBrightIndigo: '#18608C',
        ourBrightGray: '#ECECEC',
      },
    },
  },
  plugins: [],
};
