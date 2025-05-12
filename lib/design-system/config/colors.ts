/**
 * Building Bridges Design System
 * Color Palette Configuration
 * 
 * This file contains all color definitions for the Building Bridges brand.
 * Always reference these color variables instead of using hard-coded values.
 */

// Primary brand colors
export const primary = {
  main: '#8C52FF', // Primary brand color: Lila
  light: '#A37EFF', // Lighter variant
  dark: '#6B38DB', // Darker variant
};

// Secondary colors
export const secondary = {
  green: '#10B981', // Secondary 1: Green
  teal: '#06B6D4', // Secondary 2: Türkis/Teal
};

// Accent colors for highlights, notifications, states
export const accent = {
  red: '#EF4444', // Accent 1: Red - for errors, warnings
  yellow: '#F59E0B', // Accent 2: Yellow - for highlights, notifications
};

// Text colors
export const text = {
  primary: '#111827', // Text Primary: Very Dark Gray
  secondary: '#4B5563', // Text Secondary: Gray-600
  muted: '#6B7280', // Text Muted: Gray-500
  light: '#FFFFFF', // White text for dark backgrounds
};

// Background colors
export const background = {
  primary: '#FFFFFF', // Background Primary: White
  secondary: '#F9FAFB', // Background Secondary: Very Light Gray
  hover: '#F3F4F6', // Hover Background: Light Gray
  dark: '#111827', // Dark background for contrast sections
};

// Border colors
export const border = {
  default: '#E5E7EB', // Default border: Gray-200
  light: '#F3F4F6', // Lighter border
  dark: '#D1D5DB', // Darker border
};

// System state colors
export const state = {
  success: '#10B981', // Success state (reusing secondary.green)
  error: '#EF4444', // Error state (reusing accent.red)
  warning: '#F59E0B', // Warning state (reusing accent.yellow)
  info: '#06B6D4', // Info state (reusing secondary.teal)
};

// Export a complete colors object for easy imports
export const colors = {
  primary,
  secondary,
  accent,
  text,
  background,
  border,
  state,
};

export default colors; 