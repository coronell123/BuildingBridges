import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: "hsl(var(--primary))",
        'primary-light': "hsl(var(--primary-light))",
        'primary-dark': "hsl(var(--primary-dark))",
        'secondary-green': "hsl(var(--secondary-green))",
        'secondary-teal': "hsl(var(--secondary-teal))",
        'accent-red': "hsl(var(--accent-red))",
        'accent-yellow': "hsl(var(--accent-yellow))",
        'text-primary': "hsl(var(--text-primary))",
        'text-secondary': "hsl(var(--text-secondary))",
        'text-muted': "hsl(var(--text-muted))",
        'text-light': "hsl(var(--text-light))",
        'background-primary': "hsl(var(--background-primary))",
        'background-secondary': "hsl(var(--background-secondary))",
        'background-hover': "hsl(var(--background-hover))",
        'background-dark': "hsl(var(--background-dark))",
        border: "hsl(var(--border-default))",
        'border-light': "hsl(var(--border-light))",
        'border-dark': "hsl(var(--border-dark))",
        background: "hsl(var(--background-primary))",
        foreground: "hsl(var(--text-primary))",
      },
      borderRadius: {
        small: 'var(--radius-small)',
        medium: 'var(--radius-medium)',
        large: 'var(--radius-large)',
        round: 'var(--radius-round)',
      },
      maxWidth: {
        'content': '1200px',
      },
    },
  },
  plugins: [
    require('tailwindcss-react-aria-components'),
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
  ],
};
export default config;
