/**
 * Building Bridges Design System
 * Main Export
 * 
 * This file exports the entire design system from a single entry point.
 */

// Export design tokens and configuration
export * from './config';

// Export theme utilities
export * from './theme';

// Export components
export * from './components';

// Default export
import designSystem from './config';
export default designSystem; 