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
        // Neutral grays (slate-based) for Stripe aesthetic
        neutral: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
          950: '#020617',
        },
        // Subtle purple accent (primary CTA)
        accent: {
          DEFAULT: '#8B5CF6',
          light: '#A78BFA',
          dark: '#7C3AED',
          50: '#FAF5FF',
          100: '#F3E8FF',
        },
        // Subtle blue accent (secondary)
        blue: {
          DEFAULT: '#3B82F6',
          light: '#60A5FA',
          dark: '#2563EB',
          50: '#EFF6FF',
          100: '#DBEAFE',
        },
        // Muted semantic colors
        success: '#059669',
        warning: '#D97706',
        error: '#DC2626',
        info: '#0284C7',
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
        'sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'md': '0 4px 6px -1px rgb(0 0 0 / 0.1)',
        'lg': '0 10px 15px -3px rgb(0 0 0 / 0.1)',
        'xl': '0 20px 25px -5px rgb(0 0 0 / 0.1)',
        'card': '0 1px 3px rgba(0,0,0,0.1)',
        'card-hover': '0 4px 12px rgba(0,0,0,0.15)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
export default config;
