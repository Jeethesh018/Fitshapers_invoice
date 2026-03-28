/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0B0B0C',
        charcoal: '#16181C',
        ember: '#F97316',
        ember2: '#FB923C'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        pop: ['Poppins', 'sans-serif']
      },
      boxShadow: {
        glow: '0 0 0 2px rgba(249,115,22,0.35), 0 10px 24px rgba(249,115,22,0.2)'
      },
      backgroundImage: {
        'ember-gradient': 'linear-gradient(135deg, #FB923C 0%, #EA580C 45%, #7C2D12 100%)'
      }
    }
  },
  plugins: []
};
