# Typography System

The Building Bridges typography system is designed to create a consistent, accessible, and responsive reading experience across all platforms and devices.

## Font Families

We use a carefully selected set of fonts that complement each other and maintain readability:

- **Primary Font (Inter)**: Used for body text and general UI elements
  ```css
  font-family: var(--font-primary);
  ```

- **Display Font (Satoshi)**: Used for headlines and large text
  ```css
  font-family: var(--font-display);
  ```

- **Monospace Font (JetBrains Mono)**: Used for code snippets and technical content
  ```css
  font-family: var(--font-mono);
  ```

## Type Scale

Our type scale follows a modular scale of 1.25, ensuring consistent and harmonious size relationships:

| Class      | Size (rem) | Pixels | Usage |
|------------|------------|---------|-------|
| .text-xs   | 0.75      | 12px    | Small labels, footnotes |
| .text-sm   | 0.875     | 14px    | Secondary text, captions |
| .text-base | 1.0       | 16px    | Body text |
| .text-lg   | 1.125     | 18px    | Large body text |
| .text-xl   | 1.25      | 20px    | Subheadings |
| .text-2xl  | 1.5       | 24px    | Small headlines |
| .text-3xl  | 1.875     | 30px    | Medium headlines |
| .text-4xl  | 2.25      | 36px    | Large headlines |
| .text-5xl  | 3.0       | 48px    | Extra large headlines |
| .text-6xl  | 3.75      | 60px    | Hero headlines |

## Font Weights

Available font weights for flexible typography:

| Class           | Weight | Usage |
|-----------------|--------|-------|
| .font-thin      | 100    | Minimal emphasis |
| .font-extralight| 200    | Light emphasis |
| .font-light     | 300    | Subtle emphasis |
| .font-normal    | 400    | Default body text |
| .font-medium    | 500    | Medium emphasis |
| .font-semibold  | 600    | Strong emphasis |
| .font-bold      | 700    | Headlines, important text |
| .font-extrabold | 800    | Extra emphasis |
| .font-black     | 900    | Maximum emphasis |

## Line Heights

Carefully chosen line heights for optimal readability:

| Class           | Value | Usage |
|-----------------|-------|-------|
| .leading-none   | 1     | Headings, single-line text |
| .leading-tight  | 1.25  | Compact text |
| .leading-snug   | 1.375 | Slightly compact text |
| .leading-normal | 1.5   | Body text |
| .leading-relaxed| 1.625 | Relaxed body text |
| .leading-loose  | 2     | Spacious text |

## Letter Spacing

Control character spacing for different contexts:

| Class            | Value   | Usage |
|------------------|---------|-------|
| .tracking-tighter| -0.05em | Tight headlines |
| .tracking-tight  | -0.025em| Compact text |
| .tracking-normal | 0       | Default spacing |
| .tracking-wide   | 0.025em | Enhanced readability |
| .tracking-wider  | 0.05em  | Emphasis |
| .tracking-widest | 0.1em   | Maximum spacing |

## Responsive Typography

Our typography system includes fluid scaling for responsive design:

```css
/* Example of responsive text size */
.text-base {
  font-size: clamp(1rem, 0.95rem + var(--fluid-bp), 1.125rem);
}
```

### Breakpoints

- **Small (sm)**: 640px and up
- **Medium (md)**: 768px and up
- **Large (lg)**: 1024px and up

## Accessibility

Our typography system is designed with accessibility in mind:

1. **Minimum Font Sizes**
   - Body text: 16px (1rem)
   - Small text: 12px (0.75rem)

2. **Color Contrast**
   - All text meets WCAG 2.1 AA standards
   - Large text (18px+) follows relaxed contrast requirements

3. **Line Length**
   - Maximum width for optimal readability: 75 characters
   - Use `.max-w-prose` class for ideal line length

4. **Screen Reader Support**
   - Use `.sr-only` for screen reader text
   - Maintain semantic HTML structure

## Usage Examples

### Headlines
```html
<h1 class="font-display text-4xl font-bold leading-tight">
  Main Headline
</h1>

<h2 class="font-display text-2xl font-semibold leading-snug">
  Section Headline
</h2>
```

### Body Text
```html
<p class="font-primary text-base leading-normal">
  Regular paragraph text with good readability.
</p>

<p class="font-primary text-sm text-gray-600 leading-relaxed">
  Secondary text with slightly lighter weight.
</p>
```

### Special Text
```html
<span class="text-lg font-medium tracking-wide uppercase">
  Featured Label
</span>

<code class="font-mono text-sm">
  Code example
</code>
```

## Best Practices

1. **Hierarchy**
   - Maintain clear visual hierarchy
   - Use appropriate font sizes for different content levels
   - Combine weight and size for emphasis

2. **Responsiveness**
   - Test typography across different screen sizes
   - Use fluid typography for smooth scaling
   - Adjust line heights for different viewport widths

3. **Performance**
   - Load fonts efficiently using `font-display: swap`
   - Preload critical fonts
   - Use system fonts as fallbacks

4. **Accessibility**
   - Maintain sufficient color contrast
   - Use appropriate line heights for readability
   - Implement proper heading structure
   - Support text zoom and user preferences

## Implementation Notes

1. **Font Loading**
   ```html
   <link rel="preload" href="/fonts/Inter.woff2" as="font" type="font/woff2" crossorigin>
   ```

2. **CSS Import**
   ```css
   @import 'styles/tokens/typography.css';
   @import 'styles/utilities/typography.css';
   ```

3. **Dark Mode Support**
   ```css
   @media (prefers-color-scheme: dark) {
     /* Dark mode typography adjustments */
   }
   ```

## Maintenance

1. **Adding New Styles**
   - Follow the established naming convention
   - Update documentation
   - Test across breakpoints
   - Verify accessibility

2. **Updates and Changes**
   - Document changes in changelog
   - Test impact on existing components
   - Update example code
   - Verify browser support 