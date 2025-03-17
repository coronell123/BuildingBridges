/**
 * Building Bridges Design System
 * Tailwind Theme Configuration
 * 
 * This file converts our design system to a format compatible with Tailwind CSS.
 * It will be imported in the tailwind.config.ts file.
 */

import { colors, typography, spacing, breakpoints } from './config';

/**
 * Converts hex colors to HSL format for Tailwind
 * @param hex The hex color code
 * @returns HSL values as a string (e.g., "220 100% 50%")
 */
function hexToHSL(hex: string): string {
  // Remove the # if present
  hex = hex.replace(/^#/, '');
  
  // Parse the hex values
  let r = parseInt(hex.substring(0, 2), 16) / 255;
  let g = parseInt(hex.substring(2, 4), 16) / 255;
  let b = parseInt(hex.substring(4, 6), 16) / 255;
  
  // Find the minimum and maximum values to calculate the lightness
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  
  // Calculate HSL values
  let h = 0;
  let s = 0;
  let l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) * 60;
        break;
      case g:
        h = ((b - r) / d + 2) * 60;
        break;
      case b:
        h = ((r - g) / d + 4) * 60;
        break;
    }
  }
  
  // Round the values
  h = Math.round(h);
  s = Math.round(s * 100);
  l = Math.round(l * 100);
  
  return `${h} ${s}% ${l}%`;
}

// Create CSS variables for the theme
export const cssVariables = {
  // Color variables
  '--primary': hexToHSL(colors.primary.main),
  '--primary-light': hexToHSL(colors.primary.light),
  '--primary-dark': hexToHSL(colors.primary.dark),
  
  '--secondary-green': hexToHSL(colors.secondary.green),
  '--secondary-teal': hexToHSL(colors.secondary.teal),
  
  '--accent-red': hexToHSL(colors.accent.red),
  '--accent-yellow': hexToHSL(colors.accent.yellow),
  
  '--text-primary': hexToHSL(colors.text.primary),
  '--text-secondary': hexToHSL(colors.text.secondary),
  '--text-muted': hexToHSL(colors.text.muted),
  '--text-light': hexToHSL(colors.text.light),
  
  '--background-primary': hexToHSL(colors.background.primary),
  '--background-secondary': hexToHSL(colors.background.secondary),
  '--background-hover': hexToHSL(colors.background.hover),
  '--background-dark': hexToHSL(colors.background.dark),
  
  '--border-default': hexToHSL(colors.border.default),
  '--border-light': hexToHSL(colors.border.light),
  '--border-dark': hexToHSL(colors.border.dark),
  
  // Typography variables
  '--font-family-primary': typography.fontFamily.primary,
  '--font-family-serif': typography.fontFamily.serif,
  '--font-family-mono': typography.fontFamily.mono,
  
  // Spacing and layout variables
  '--max-content-width': spacing.layout.maxContentWidth,
  
  // Border radius
  '--radius-small': spacing.layout.borderRadius.small,
  '--radius-medium': spacing.layout.borderRadius.medium,
  '--radius-large': spacing.layout.borderRadius.large,
  '--radius-round': spacing.layout.borderRadius.round,
};

// Tailwind theme extension
export const tailwindTheme = {
  container: {
    center: true,
    padding: "2rem",
    screens: {
      "2xl": "1400px",
    },
  },
  extend: {
    colors: {
      primary: {
        DEFAULT: "hsl(var(--primary))",
        light: "hsl(var(--primary-light))",
        dark: "hsl(var(--primary-dark))",
        foreground: "hsl(var(--text-light))",
      },
      
      secondary: {
        green: "hsl(var(--secondary-green))",
        teal: "hsl(var(--secondary-teal))",
        foreground: "hsl(var(--text-light))",
      },
      
      accent: {
        red: "hsl(var(--accent-red))",
        yellow: "hsl(var(--accent-yellow))",
        DEFAULT: "hsl(var(--primary-light))",
        foreground: "hsl(var(--text-light))",
      },
      
      text: {
        primary: "hsl(var(--text-primary))",
        secondary: "hsl(var(--text-secondary))",
        muted: "hsl(var(--text-muted))",
        light: "hsl(var(--text-light))",
      },
      
      bg: {
        primary: "hsl(var(--background-primary))",
        secondary: "hsl(var(--background-secondary))",
        hover: "hsl(var(--background-hover))",
        dark: "hsl(var(--background-dark))",
      },
      
      border: {
        DEFAULT: "hsl(var(--border-default))",
        light: "hsl(var(--border-light))",
        dark: "hsl(var(--border-dark))",
      },
      
      foreground: "hsl(var(--text-primary))",
      background: "hsl(var(--background-primary))",
      muted: {
        DEFAULT: "hsl(var(--background-secondary))",
        foreground: "hsl(var(--text-muted))",
      },
      destructive: {
        DEFAULT: "hsl(var(--accent-red))",
        foreground: "hsl(var(--text-light))",
      },
    },
    
    fontFamily: {
      sans: [typography.fontFamily.primary],
      serif: [typography.fontFamily.serif],
      mono: [typography.fontFamily.mono],
    },
    
    borderRadius: {
      small: 'var(--radius-small)',
      medium: 'var(--radius-medium)',
      large: 'var(--radius-large)',
      round: 'var(--radius-round)',
    },
    
    maxWidth: {
      content: spacing.layout.maxContentWidth,
    },
  },
  
  screens: {
    xs: `${breakpoints.values.xs}px`,
    sm: `${breakpoints.values.sm}px`,
    md: `${breakpoints.values.md}px`,
    lg: `${breakpoints.values.lg}px`,
    xl: `${breakpoints.values.xl}px`,
    '2xl': `${breakpoints.values['2xl']}px`,
  },
};

export default {
  cssVariables,
  tailwindTheme,
}; 