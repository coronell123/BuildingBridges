# Building Bridges Design System

## Color System Implementation

Our color system is built around our primary purple brand color with carefully selected accent colors for different purposes.

### Primary Colors

```css
Primary Purple: hsl(262, 100%, 66%) /* #8C52FF */
Light Purple: hsl(262, 100%, 75%) /* #A37EFF */
Dark Purple: hsl(262, 57%, 55%) /* #6B38DB */
```

### Usage in Components

1. **Buttons**
   ```tsx
   // Primary Button
   <Button>Primary Action</Button>
   
   // Accent Button
   <Button variant="accent">Accent Action</Button>
   
   // Ghost Button
   <Button variant="ghost">Ghost Action</Button>
   ```

2. **Cards**
   ```tsx
   // Regular Card
   <Card>
     <CardHeader>
       <CardTitle>Card Title</CardTitle>
     </CardHeader>
   </Card>
   
   // Accent Card
   <Card accent>
     <CardHeader>
       <CardTitle>Accent Card</CardTitle>
     </CardHeader>
   </Card>
   ```

## Typography System

We use Inter as our primary font and JetBrains Mono for code blocks.

### Font Implementation

```tsx
// Layout.tsx
<html className={`${inter.variable} ${jetbrainsMono.variable}`}>
```

### Type Scale

- h1: 2.25rem (36px)
- h2: 1.875rem (30px)
- h3: 1.5rem (24px)
- h4: 1.25rem (20px)
- h5: 1.125rem (18px)
- h6: 1rem (16px)

## Animation System

We provide several animation utilities:

```tsx
// Fade In
<div className="animate-fade-in">Content</div>

// Slide In from Top
<div className="animate-slide-in-from-top">Content</div>

// Slide In from Bottom
<div className="animate-slide-in-from-bottom">Content</div>
```

## Component Examples

### Button Variants

```tsx
<Button>Default Button</Button>
<Button variant="secondary">Secondary Button</Button>
<Button variant="outline">Outline Button</Button>
<Button variant="ghost">Ghost Button</Button>
<Button variant="link">Link Button</Button>
```

### Card Examples

```tsx
<Card>
  <CardHeader>
    <CardTitle>Regular Card</CardTitle>
    <CardDescription>Card description here</CardDescription>
  </CardHeader>
  <CardContent>
    Main content goes here
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>

<Card accent>
  <CardHeader>
    <CardTitle>Accent Card</CardTitle>
    <CardDescription>With purple accent border</CardDescription>
  </CardHeader>
  <CardContent>
    Content with accent styling
  </CardContent>
</Card>
```

## Best Practices

1. **Color Usage**
   - Use primary purple for main actions and important UI elements
   - Use accent colors sparingly for emphasis
   - Ensure sufficient contrast for accessibility

2. **Typography**
   - Maintain consistent heading hierarchy
   - Use appropriate font weights for different contexts
   - Keep line lengths readable (max-width)

3. **Animation**
   - Use animations purposefully
   - Keep durations short (300ms standard)
   - Provide reduced-motion alternatives

4. **Components**
   - Use semantic HTML elements
   - Maintain consistent spacing
   - Follow accessibility guidelines

## Accessibility Guidelines

1. **Color Contrast**
   - All text meets WCAG 2.1 AA standards
   - Interactive elements have sufficient contrast
   - Don't rely on color alone for information

2. **Typography**
   - Maintain minimum font sizes (16px body, 14px small)
   - Use relative units (rem) for scaling
   - Ensure proper line height for readability

3. **Interactive Elements**
   - Clear focus indicators
   - Proper ARIA labels
   - Keyboard navigation support

## Implementation Files

- `app/globals.css`: Global styles and CSS variables
- `tailwind.config.ts`: Tailwind configuration
- `components/ui/*`: UI components
- `.cursor/rules/design-system.mdc`: Design system guidelines 