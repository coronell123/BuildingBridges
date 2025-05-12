/**
 * Building Bridges Design System
 * Typography Configuration
 * 
 * This file defines all typography-related settings including font families,
 * font sizes, font weights, line heights, and letter spacing.
 */

// Font families
export const fontFamily = {
  // Primary font family - using system font stack with preferred fonts first
  primary: [
    'Poppins',
    'Roboto',
    'Open Sans',
    'Lato',
    'Montserrat',
    'Helvetica',
    'Arial',
    'sans-serif',
  ].join(', '),
  
  // Secondary/serif font family
  serif: [
    'Merriweather',
    'Georgia',
    'Times New Roman',
    'serif',
  ].join(', '),
  
  // Monospace font family for code blocks, etc.
  mono: [
    'ui-monospace',
    'SFMono-Regular',
    'Menlo',
    'Monaco',
    'Consolas',
    'Liberation Mono',
    'Courier New',
    'monospace',
  ].join(', '),
};

// Font sizes
export const fontSize = {
  // Headings
  h1: '36px',
  h2: '28px',
  h3: '24px',
  h4: '20px',
  h5: '18px',
  h6: '16px',
  
  // Body text
  body: '16px',
  small: '14px',
  caption: '12px',
  
  // Special sizes
  display: '48px',
  jumbo: '64px',
};

// Font weights
export const fontWeight = {
  regular: 400,
  medium: 500,
  semiBold: 600,
  bold: 700,
};

// Line heights
export const lineHeight = {
  tight: 1.2,    // For headings
  normal: 1.5,   // For body text
  relaxed: 1.75, // For readable text blocks
};

// Letter spacing
export const letterSpacing = {
  tight: '-0.025em', // For headings
  normal: '0',       // Default 
  wide: '0.025em',   // For better readability
};

// Typography presets combining all the settings
export const typography = {
  h1: {
    fontSize: fontSize.h1,
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.tight,
    letterSpacing: letterSpacing.tight,
  },
  h2: {
    fontSize: fontSize.h2,
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.tight,
    letterSpacing: letterSpacing.tight,
  },
  h3: {
    fontSize: fontSize.h3,
    fontWeight: fontWeight.semiBold,
    lineHeight: lineHeight.tight,
    letterSpacing: letterSpacing.tight,
  },
  h4: {
    fontSize: fontSize.h4,
    fontWeight: fontWeight.semiBold,
    lineHeight: lineHeight.tight,
    letterSpacing: letterSpacing.tight,
  },
  h5: {
    fontSize: fontSize.h5,
    fontWeight: fontWeight.semiBold,
    lineHeight: lineHeight.tight,
    letterSpacing: letterSpacing.tight,
  },
  h6: {
    fontSize: fontSize.h6,
    fontWeight: fontWeight.semiBold,
    lineHeight: lineHeight.tight,
    letterSpacing: letterSpacing.tight,
  },
  body: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.normal,
  },
  small: {
    fontSize: fontSize.small,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.normal,
  },
  caption: {
    fontSize: fontSize.caption,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.normal,
    fontStyle: 'italic',
  },
};

export default { 
  fontFamily, 
  fontSize, 
  fontWeight, 
  lineHeight, 
  letterSpacing, 
  typography 
}; 