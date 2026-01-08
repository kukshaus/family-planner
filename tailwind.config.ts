import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6366F1',
          light: '#818CF8',
          dark: '#4F46E5',
        },
        secondary: {
          DEFAULT: '#EC4899',
          light: '#F472B6',
          dark: '#DB2777',
        },
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Manrope', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'gradient-sunset': 'linear-gradient(135deg, #667EEA 0%, #F093FB 100%)',
        'gradient-ocean': 'linear-gradient(135deg, #4FACFE 0%, #00F2FE 100%)',
        'gradient-forest': 'linear-gradient(135deg, #43E97B 0%, #38F9D7 100%)',
        'gradient-dawn': 'linear-gradient(135deg, #FA709A 0%, #FEE140 100%)',
      },
      borderRadius: {
        'card-mobile': '12px',
        'card-desktop': '16px',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.1)',
        'card-hover': '0 4px 12px rgba(0,0,0,0.15)',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
export default config;
