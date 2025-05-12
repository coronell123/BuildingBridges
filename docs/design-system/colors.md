# Color System Documentation

## Overview

The Building Bridges Website uses a carefully crafted color system designed to create a cohesive, accessible, and visually appealing user interface. Our color system is built on CSS custom properties (variables) and follows WCAG 2.1 AA accessibility standards.

## Color Palette

### Primary Colors - Building Bridges Blue

Our primary color palette is based on a vibrant blue that represents trust, professionalism, and connection. The base color (#0EA5E9) has been chosen for its excellent accessibility scores and visual appeal.

```css
--primary-50:  #F0F9FF  /* Light background, hover states */
--primary-500: #0EA5E9  /* Primary buttons, links */
--primary-900: #0C4A6E  /* Dark backgrounds */
```

Usage:
- Primary actions (buttons, links)
- Brand elements
- Key UI components
- Focus states

### Secondary Colors - Sage Green

Our secondary palette uses a calming sage green to represent growth, success, and positive interactions.

```css
--secondary-50:  #ECFDF5
--secondary-500: #10B981
--secondary-900: #064E3B
```

Usage:
- Success states
- Progress indicators
- Secondary actions
- Positive feedback

### Accent Colors - Warm Orange

The accent palette provides visual punch for highlighting important elements and calls to action.

```css
--accent-50:  #FFF7ED
--accent-500: #F97316
--accent-900: #7C2D12
```

Usage:
- Highlights
- Important notifications
- Call-to-action elements
- Feature promotions

## Semantic Colors

### Status Colors

```css
/* Success */
--success-50:  #F0FDF4
--success-500: #22C55E
--success-900: #14532D

/* Warning */
--warning-50:  #FEFCE8
--warning-500: #EAB308
--warning-900: #713F12

/* Error */
--error-50:  #FEF2F2
--error-500: #EF4444
--error-900: #7F1D1D

/* Info */
--info-50:  #EFF6FF
--info-500: #3B82F6
--info-900: #1E3A8A
```

Usage:
- Form validation
- System messages
- Status indicators
- Progress feedback

## Surface Colors

Our surface colors create visual hierarchy through subtle variations in background colors.

```css
--surface-0: var(--neutral-50)   /* Base layer */
--surface-1: var(--neutral-100)  /* Cards, dropdowns */
--surface-2: var(--neutral-200)  /* Modals, popovers */
--surface-3: var(--neutral-300)  /* Tooltips */
```

## Text Colors

Carefully selected text colors ensure optimal readability across different contexts.

```css
--text-primary: var(--neutral-900)
--text-secondary: var(--neutral-600)
--text-disabled: var(--neutral-400)
--text-inverse: var(--neutral-50)
```

## Usage Guidelines

### Accessibility

All color combinations in our system meet WCAG 2.1 AA standards:
- Normal text: 4.5:1 contrast ratio
- Large text: 3:1 contrast ratio
- UI components: 3:1 contrast ratio

### Dark Mode

Our color system includes dark mode variants that automatically adjust when the `[data-theme="dark"]` attribute is present. The system inverts the neutral scale and adjusts surface and text colors accordingly.

### Utility Classes

We provide utility classes for easy implementation:

```html
<!-- Background Colors -->
<div class="bg-primary-500">Primary Background</div>
<div class="bg-surface-elevated">Elevated Surface</div>

<!-- Text Colors -->
<p class="text-default">Default Text</p>
<p class="text-secondary">Secondary Text</p>

<!-- Interactive States -->
<button class="bg-primary-500 hover:bg-primary-600">
  Hover State Button
</button>
```

### Best Practices

1. **Consistent Usage**
   - Use primary colors for main actions
   - Use secondary colors for supporting elements
   - Use accent colors sparingly for emphasis

2. **Accessibility**
   - Always verify contrast ratios
   - Provide sufficient color contrast for text
   - Don't rely solely on color for information

3. **Dark Mode**
   - Test all color combinations in both light and dark modes
   - Ensure sufficient contrast in both modes
   - Use surface colors for layering

4. **Performance**
   - Use CSS custom properties for dynamic theming
   - Minimize runtime color calculations
   - Use utility classes for common color applications

## Implementation Examples

### Buttons

```html
<!-- Primary Button -->
<button class="bg-primary-500 hover:bg-primary-600 text-white">
  Primary Action
</button>

<!-- Secondary Button -->
<button class="bg-secondary-500 hover:bg-secondary-600 text-white">
  Secondary Action
</button>
```

### Alerts

```html
<!-- Success Alert -->
<div class="bg-success-50 text-success-900 border-success-500">
  Success Message
</div>

<!-- Error Alert -->
<div class="bg-error-50 text-error-900 border-error-500">
  Error Message
</div>
```

### Cards

```html
<!-- Basic Card -->
<div class="bg-surface-elevated shadow-md">
  <h3 class="text-default">Card Title</h3>
  <p class="text-secondary">Card content</p>
</div>
```

## Tools and Resources

- [WCAG Color Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Color Scale Generator](https://hihayk.github.io/scale/)
- [Color Blindness Simulator](https://www.toptal.com/designers/colorfilter)

## Updates and Maintenance

The color system is maintained in:
- `styles/tokens/colors.css` - Color tokens
- `styles/utilities/colors.css` - Utility classes
- `docs/design-system/colors.md` - This documentation

When updating the color system:
1. Update the token definitions
2. Update utility classes
3. Update this documentation
4. Test all color combinations
5. Verify accessibility compliance
6. Test dark mode variants 

## Form States

Our color system includes specific tokens for form elements to ensure consistent and accessible form interactions:

```css
/* Form Borders */
--input-border: var(--neutral-300)
--input-border-hover: var(--neutral-400)
--input-border-focus: var(--primary-500)
--input-border-error: var(--error-500)
--input-border-success: var(--success-500)

/* Form Backgrounds */
--input-bg: var(--neutral-50)
--input-bg-disabled: var(--neutral-100)
```

Usage:
```html
<input class="input-border input-bg transition-colors hover:input-border-hover focus:input-border-focus" />
<input class="input-border input-bg input-border-error" />
```

## Focus States

Enhanced focus states for better accessibility:

```css
/* Focus Ring Colors */
--focus-ring-color: var(--primary-500)
--focus-ring-alpha: 0.25
--focus-ring-error: var(--error-500)
--focus-ring-success: var(--success-500)
```

Usage:
```html
<button class="focus-ring">Default Focus</button>
<button class="focus-ring focus-ring-error">Error Focus</button>
```

## Transitions

Smooth color transitions for interactive elements:

```css
/* Transition Tokens */
--transition-colors: 150ms
--transition-shadow: 200ms
--transition-transform: 200ms
```

Usage:
```html
<button class="transition-colors hover:bg-primary-600">
  Smooth Color Transition
</button>

<div class="transition-shadow hover:shadow-medium">
  Smooth Shadow Transition
</div>
```

## Enhanced Shadows

Granular shadow control with alpha channels:

```css
/* Shadow Alpha Values */
--shadow-alpha-light: 0.05
--shadow-alpha-medium: 0.1
--shadow-alpha-heavy: 0.15
```

Usage:
```html
<div class="shadow-light">Light Shadow</div>
<div class="shadow-medium">Medium Shadow</div>
<div class="shadow-heavy">Heavy Shadow</div>
```

## Interactive Components

Combined utility classes for common interactive states:

```html
<!-- Primary Interactive Button -->
<button class="interactive-primary">
  Primary Button
</button>

<!-- Secondary Interactive Button -->
<button class="interactive-secondary">
  Secondary Button
</button>
```

## Gradient Opacity

Gradient utilities with opacity control:

```html
<div class="gradient-primary-fade">
  Semi-transparent gradient
</div>
```

## Best Practices

1. **Transitions**
   - Use transition utilities for all interactive color changes
   - Keep transitions between 150ms and 200ms for optimal UX
   - Combine multiple transitions when needed

2. **Focus States**
   - Always use focus rings on interactive elements
   - Ensure focus states are visible in both light and dark modes
   - Use error and success variants appropriately

3. **Forms**
   - Apply consistent form states across all input types
   - Use transition utilities for smooth state changes
   - Ensure sufficient contrast in all states

4. **Shadows**
   - Use appropriate shadow intensity for different elevation levels
   - Adjust shadow values for dark mode
   - Combine with transitions for smooth elevation changes

## Testing Checklist

- [ ] Verify all color combinations meet WCAG 2.1 AA standards
- [ ] Test focus states visibility across different backgrounds
- [ ] Ensure smooth transitions across all interactive states
- [ ] Validate form states in both light and dark modes
- [ ] Check shadow visibility and contrast in different contexts
- [ ] Test gradient opacity in various lighting conditions 