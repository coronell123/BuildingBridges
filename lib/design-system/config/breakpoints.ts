/**
 * Building Bridges Design System
 * Breakpoints Configuration
 * 
 * This file defines the breakpoints used for responsive design.
 * These values determine when the layout should adapt to different screen sizes.
 */

// Breakpoint values (in pixels)
export const values = {
  xs: 0,     // Extra small screens (phones in portrait mode)
  sm: 640,   // Small screens (phones in landscape, small tablets)
  md: 768,   // Medium screens (tablets)
  lg: 1024,  // Large screens (desktops, laptops)
  xl: 1280,  // Extra large screens (large desktops)
  '2xl': 1536, // Ultra-wide screens
};

// Media queries for use with CSS-in-JS solutions
export const up = (breakpoint: keyof typeof values) => {
  const value = values[breakpoint];
  return `@media (min-width: ${value}px)`;
};

export const down = (breakpoint: keyof typeof values) => {
  const value = values[breakpoint];
  return `@media (max-width: ${value - 0.05}px)`;
};

export const between = (start: keyof typeof values, end: keyof typeof values) => {
  return `@media (min-width: ${values[start]}px) and (max-width: ${values[end] - 0.05}px)`;
};

// Export all breakpoint utilities
export const breakpoints = {
  values,
  up,
  down,
  between,
};

export default breakpoints; 