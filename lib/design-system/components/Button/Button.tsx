import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// Define button variants using class-variance-authority
const buttonVariants = cva(
  'inline-flex items-center justify-center font-medium transition-colors duration-150 focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none select-none rounded-md',
  {
    variants: {
      variant: {
        default: 'bg-primary text-white hover:bg-primary/90',
        secondary: 'bg-secondary-green text-white hover:opacity-90',
        teal: 'bg-secondary-teal text-white hover:opacity-90',
        destructive: 'bg-accent-red text-white hover:opacity-90',
        outline: 'bg-transparent border border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50',
        ghost: 'bg-transparent hover:bg-gray-100 text-gray-700',
        link: 'text-primary hover:text-primary-dark underline-offset-4 hover:underline bg-transparent p-0 h-auto',
        share: 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50',
        save: 'bg-[#FF6B6B] text-white hover:bg-[#FF5252]',
        toggle: 'bg-gray-300 text-gray-700',
      },
      size: {
        xs: 'h-7 px-2.5 text-xs gap-1.5',
        sm: 'h-8 px-3 text-xs gap-2',
        md: 'h-9 px-4 text-sm gap-2',
        lg: 'h-10 px-5 text-base gap-2',
        xl: 'h-12 px-6 text-base gap-3',
        icon: 'h-9 w-9 p-1.5',
      },
      rounded: {
        default: 'rounded-md', 
        full: 'rounded-full',
        none: 'rounded-none',
        sm: 'rounded-sm',
        lg: 'rounded-lg',
      },
      loading: {
        true: 'relative text-transparent transition-none hover:text-transparent',
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      rounded: 'default',
    },
    compoundVariants: [
      {
        loading: true,
        class: 'cursor-wait'
      },
      {
        variant: 'link',
        class: 'shadow-none'
      }
    ]
  }
);

// Button component props interface
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

/**
 * Button component that follows the Building Bridges design system
 * 
 * @example
 * // Default primary button
 * <Button>Click me</Button>
 * 
 * @example
 * // Share button (outline style)
 * <Button variant="share">Share</Button>
 * 
 * @example
 * // Save button (filled coral style)
 * <Button variant="save">Save</Button>
 * 
 * @example
 * // Button with loading state
 * <Button loading>Processing...</Button>
 * 
 * @example
 * // Button with icon
 * <Button leftIcon={<Icon />}>With Icon</Button>
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, rounded, loading, leftIcon, rightIcon, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, rounded, loading, className }))}
        ref={ref}
        disabled={props.disabled || loading}
        {...props}
      >
        {loading && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <svg
              className="animate-spin h-4 w-4 text-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        )}
        {leftIcon && <span className="button-icon">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="button-icon">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants }; 