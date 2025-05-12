/**
 * Building Bridges Design System
 * Configuration Exports
 * 
 * This file exports all design system configurations from a single location.
 */

import colors from './colors';
import typography from './typography';
import spacing from './spacing';
import breakpoints from './breakpoints';

// Export each configuration module
export {
  colors,
  typography,
  spacing,
  breakpoints,
};

// Export a unified design system configuration
const designSystem = {
  colors,
  typography,
  spacing,
  breakpoints,
};

export default designSystem; 