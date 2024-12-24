import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
module.exports = {
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
        // Main background color
        'main-bg': '#fcfaee',  

        // Vintage Text Colors
        'text-primary': '#3e2723', // dark brown
        'text-secondary': '#5d4037', // medium brown
        'text-accent': '#ffab40', // warm orange

        // Background Colors
        'bg-primary': '#fff8e1', // cream
        'bg-secondary': '#fbe9e7', // light pink

        // Border Colors
        'border-primary': '#bcaaa4', // light brown
        'border-accent': '#FBBF24', // warm orange

        // Button Colors
        'btn-primary': '#8d6e63', // brown
        'btn-secondary': '#ffab40', // warm orange
        'btn-accent': '#d32f2f', // deep red

        // Additional colors for a vintage touch
        'gold': '#FFD700',
        'ivory': '#FFFFF0',
        'maroon': '#800000',
      },
    },
  },
  darkMode: "class",  // Enable dark mode
  plugins: [nextui()],
};


// const { nextui } = require("@nextui-org/react");

// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     './src/**/*.{js,jsx,ts,tsx}',
//     "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       fontFamily: {
//         lalezar: ['Lalezar', 'sans-serif'],
//         serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
//       },
//       colors: {
//         // Main background
//         'main-bg': '#FAF9F6', // Soft off-white

//         // Text Colors
//         'text-primary': '#2C1810', // Soft dark brown
//         'text-secondary': '#6B4423', // Warm medium brown
//         'text-accent': '#C17817', // Muted golden brown

//         // Background Colors
//         'bg-primary': '#F5F1E8', // Warm white
//         'bg-secondary': '#EBE6DD', // Light taupe
        
//         // Border Colors
//         'border-primary': '#D4C5B9', // Light warm gray
//         'border-accent': '#B88E5C', // Soft caramel

//         // Button Colors
//         'btn-primary': '#967259', // Muted brown
//         'btn-secondary': '#C17817', // Warm golden
//         'btn-accent': '#8B4513', // Saddle brown

//         // Accent Colors
//         'vintage-gold': '#DAA520', // Classic gold
//         'vintage-cream': '#F8F4E3', // Antique white
//         'vintage-rust': '#9B4722', // Terracotta
//       },
//     },
//   },
//   darkMode: "class",
//   plugins: [nextui()],
// };