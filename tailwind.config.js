/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      colors: {
        border: "hsl(var(--border))",
        "border-hover": "hsl(var(--border-hover))",
        input: "hsl(var(--input))",
        "input-hover": "hsl(var(--input-hover))",
        "input-focus": "hsl(var(--input-focus))",
        ring: "hsl(var(--ring))",
        "ring-hover": "hsl(var(--ring-hover))",
        background: "hsl(var(--background))",
        "background-subtle": "hsl(var(--background-subtle))",
        "background-muted": "hsl(var(--background-muted))",
        foreground: "hsl(var(--foreground))",
        "foreground-muted": "hsl(var(--foreground-muted))",
        
        // Primary colors with variants
        primary: "hsl(var(--primary))",
        "primary-light": "hsl(var(--primary-light))",
        "primary-dark": "hsl(var(--primary-dark))",
        "primary-hover": "hsl(var(--primary-hover))",
        "primary-active": "hsl(var(--primary-active))",
        "primary-foreground": "hsl(var(--primary-foreground))",
        
        // Secondary colors with variants
        secondary: "hsl(var(--secondary))",
        "secondary-light": "hsl(var(--secondary-light))",
        "secondary-dark": "hsl(var(--secondary-dark))",
        "secondary-hover": "hsl(var(--secondary-hover))",
        "secondary-active": "hsl(var(--secondary-active))",
        "secondary-foreground": "hsl(var(--secondary-foreground))",
        
        // Accent colors
        accent: "hsl(var(--accent))",
        "accent-light": "hsl(var(--accent-light))",
        "accent-dark": "hsl(var(--accent-dark))",
        "accent-foreground": "hsl(var(--accent-foreground))",
        
        // Status colors
        destructive: "hsl(var(--destructive))",
        "destructive-light": "hsl(var(--destructive-light))",
        "destructive-foreground": "hsl(var(--destructive-foreground))",
        
        success: "hsl(var(--success))",
        "success-light": "hsl(var(--success-light))",
        "success-foreground": "hsl(var(--success-foreground))",
        
        info: "hsl(var(--info))",
        "info-light": "hsl(var(--info-light))",
        "info-foreground": "hsl(var(--info-foreground))",
        
        warning: "hsl(var(--warning))",
        "warning-light": "hsl(var(--warning-light))",
        "warning-foreground": "hsl(var(--warning-foreground))",
        
        // Component colors
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        
        popover: "hsl(var(--popover))",
        "popover-foreground": "hsl(var(--popover-foreground))",
        
        card: "hsl(var(--card))",
        "card-hover": "hsl(var(--card-hover))",
        "card-foreground": "hsl(var(--card-foreground))",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        DEFAULT: "var(--radius)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
      },
      maxWidth: {
        content: "1200px",
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    // ...other plugins
  ],
}

