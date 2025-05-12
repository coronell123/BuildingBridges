/**
 * Building Bridges Design System
 * Spacing Configuration
 * 
 * This file defines spacing values used throughout the application.
 * Consistent spacing helps maintain visual harmony across the UI.
 */

// Base spacing unit (in px)
export const baseSpacingUnit = 4;

// Spacing scale
export const spacing = {
  // Zero
  0: '0px',
  
  // Extra small - Micro spacing
  0.5: `${baseSpacingUnit * 0.5}px`, // 2px
  1: `${baseSpacingUnit}px`,         // 4px
  1.5: `${baseSpacingUnit * 1.5}px`, // 6px
  
  // Small - Element spacing
  2: `${baseSpacingUnit * 2}px`,     // 8px
  2.5: `${baseSpacingUnit * 2.5}px`, // 10px
  3: `${baseSpacingUnit * 3}px`,     // 12px
  
  // Medium - Component spacing
  4: `${baseSpacingUnit * 4}px`,     // 16px
  5: `${baseSpacingUnit * 5}px`,     // 20px
  6: `${baseSpacingUnit * 6}px`,     // 24px
  
  // Large - Content spacing
  8: `${baseSpacingUnit * 8}px`,     // 32px
  10: `${baseSpacingUnit * 10}px`,   // 40px
  12: `${baseSpacingUnit * 12}px`,   // 48px
  
  // Extra large - Section spacing
  16: `${baseSpacingUnit * 16}px`,   // 64px
  20: `${baseSpacingUnit * 20}px`,   // 80px
  24: `${baseSpacingUnit * 24}px`,   // 96px
  
  // Jumbo - Page spacing
  32: `${baseSpacingUnit * 32}px`,   // 128px
  40: `${baseSpacingUnit * 40}px`,   // 160px
  48: `${baseSpacingUnit * 48}px`,   // 192px
};

// Common layout constants
export const layout = {
  // Maximum content width
  maxContentWidth: '1200px',
  
  // Container padding on different screen sizes
  containerPadding: {
    xs: spacing[4],  // 16px on mobile
    sm: spacing[6],  // 24px on small screens
    md: spacing[8],  // 32px on medium screens
    lg: spacing[10], // 40px on large screens
  },
  
  // Standard section spacing
  sectionSpacing: {
    small: spacing[12],  // 48px
    medium: spacing[16], // 64px
    large: spacing[24],  // 96px
  },
  
  // Global site margin
  siteMargin: spacing[4], // 16px
  
  // Standard radius for rounded corners
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '12px',
    round: '999px', // For pills and rounded buttons
  },
};

export default {
  baseSpacingUnit,
  spacing,
  layout,
}; 