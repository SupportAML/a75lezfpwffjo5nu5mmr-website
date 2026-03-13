import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        earth: {
          50: '#fef7ed',
          100: '#fdefd3',
          200: '#fadba5',
          300: '#f6c06d',
          400: '#f19a33',
          500: '#ed7f0c',
          600: '#de6407',
          700: '#b84a09',
          800: '#943a0f',
          900: '#793210',
        },
        forest: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        bark: {
          50: '#faf8f5',
          100: '#f4f0e8',
          200: '#e6ddd0',
          300: '#d4c4ab',
          400: '#bfa482',
          500: '#a68a64',
          600: '#8d7052',
          700: '#725a43',
          800: '#5e4b39',
          900: '#513f32',
        },
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'celebrate': 'celebrate 0.6s ease-in-out',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        celebrate: {
          '0%': { transform: 'scale(1) rotate(0deg)' },
          '50%': { transform: 'scale(1.1) rotate(5deg)' },
          '100%': { transform: 'scale(1) rotate(0deg)' },
        },
      },
    },
  },
  plugins: [],
}
export default config