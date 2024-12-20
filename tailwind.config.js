/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb',
          hover: '#1d4ed8',
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to right, var(--tw-gradient-from), var(--tw-gradient-to))',
      },
    },
  },
  plugins: [],
  // Important: This ensures Tailwind classes work with Ant Design
  corePlugins: {
    preflight: false,
  },
};