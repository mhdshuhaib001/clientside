import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@mui/material/**/*.{js,ts,jsx,tsx}", 
    "./node_modules/@mui/icons-material/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        lalezar: ['Lalezar', 'sans-serif'],
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
      },
      colors: {
        'main-bg': '#fcfaee',
        'text-primary': '#3e2723',
        'text-secondary': '#5d4037',
        'text-accent': '#ffab40',
        'bg-primary': '#fff8e1',
        'bg-secondary': '#fbe9e7',
        'border-primary': '#bcaaa4',
        'border-accent': '#FBBF24',
        'btn-primary': '#8d6e63',
        'btn-secondary': '#ffab40',
        'btn-accent': '#d32f2f',
        'gold': '#FFD700',
        'ivory': '#FFFFF0',
        'maroon': '#800000',
      },
    },
  },
  darkMode: "class", // Enable dark mode
  plugins: [nextui()],
};
