import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// Define card variants using class-variance-authority
const cardVariants = cva(
  'rounded-md border border-border overflow-hidden transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'bg-background-primary shadow-sm hover:shadow',
        secondary: 'bg-background-secondary shadow-sm hover:shadow',
        outline: 'bg-transparent',
        ghost: 'border-0 shadow-none bg-transparent',
        elevated: 'shadow-md hover:shadow-lg',
        glass: 'bg-white/10 backdrop-blur-sm border-white/20',
        interactive: 'bg-background-primary shadow-sm hover:shadow cursor-pointer hover:border-border-dark',
      },
      padding: {
        none: '',
        sm: 'p-3',
        md: 'p-4',
        lg: 'p-6',
        xl: 'p-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'lg',
    },
  }
);

// Define header variants
const cardHeaderVariants = cva('flex flex-col space-y-1.5', {
  variants: {
    padding: {
      none: '',
      sm: 'px-3 pt-3',
      md: 'px-4 pt-4',
      lg: 'px-6 pt-6',
      xl: 'px-8 pt-8',
    },
  },
  defaultVariants: {
    padding: 'lg',
  },
});

// Define content variants
const cardContentVariants = cva('', {
  variants: {
    padding: {
      none: '',
      sm: 'px-3 py-2',
      md: 'px-4 py-3',
      lg: 'px-6 py-4',
      xl: 'px-8 py-6',
    },
  },
  defaultVariants: {
    padding: 'lg',
  },
});

// Define footer variants
const cardFooterVariants = cva('flex items-center justify-between', {
  variants: {
    padding: {
      none: '',
      sm: 'px-3 pb-3 pt-1',
      md: 'px-4 pb-4 pt-2',
      lg: 'px-6 pb-6 pt-3',
      xl: 'px-8 pb-8 pt-4',
    },
  },
  defaultVariants: {
    padding: 'lg',
  },
});

// Card component props interface
export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

// CardHeader component props interface
export interface CardHeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardHeaderVariants> {}

// CardContent component props interface
export interface CardContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardContentVariants> {}

// CardFooter component props interface
export interface CardFooterProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardFooterVariants> {}

// CardTitle component props interface
export interface CardTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {}

// CardDescription component props interface
export interface CardDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

/**
 * Card component that follows the Building Bridges design system
 * 
 * @example
 * // Basic card with title and content
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Card Title</CardTitle>
 *     <CardDescription>Card description text</CardDescription>
 *   </CardHeader>
 *   <CardContent>
 *     <p>Card content goes here</p>
 *   </CardContent>
 *   <CardFooter>
 *     <Button>Action</Button>
 *   </CardFooter>
 * </Card>
 */
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, ...props }, ref) => {
    return (
      <div
        className={cn(cardVariants({ variant, padding, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Card.displayName = 'Card';

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, padding, ...props }, ref) => {
    return (
      <div
        className={cn(cardHeaderVariants({ padding, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
CardHeader.displayName = 'CardHeader';

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, padding, ...props }, ref) => {
    return (
      <div
        className={cn(cardContentVariants({ padding, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, padding, ...props }, ref) => {
    return (
      <div
        className={cn(cardFooterVariants({ padding, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
CardFooter.displayName = 'CardFooter';

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, ...props }, ref) => {
    return (
      <h3
        className={cn('text-xl font-semibold leading-none tracking-tight text-text-primary', className)}
        ref={ref}
        {...props}
      />
    );
  }
);
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => {
    return (
      <p
        className={cn('text-text-muted text-sm', className)}
        ref={ref}
        {...props}
      />
    );
  }
);
CardDescription.displayName = 'CardDescription';

export {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
  cardVariants,
  cardHeaderVariants,
  cardContentVariants,
  cardFooterVariants,
}; 