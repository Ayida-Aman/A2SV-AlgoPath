import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground shadow-sm hover:bg-primary-hover shadow-blue-500/10 dark:shadow-blue-500/20",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary-hover border border-border/50",
        outline:
          "border border-border bg-transparent hover:bg-muted text-foreground hover:text-foreground",
        ghost:
          "hover:bg-muted text-foreground/80 hover:text-foreground",
        danger:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm",
        electric:
          "bg-accent-electric text-white hover:bg-accent-electric/90 shadow-glow-electric font-semibold",
        subtle:
          "bg-primary-muted text-primary hover:bg-primary/20 border border-primary/20",
      },
      size: {
        sm: "h-8 px-3 text-xs rounded-md gap-1.5",
        md: "h-10 px-4 py-2 gap-2",
        lg: "h-12 px-6 text-base rounded-xl gap-2.5",
        icon: "h-9 w-9 p-0",
        "icon-sm": "h-8 w-8 p-0 rounded-md",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      isLoading = false,
      startIcon,
      endIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin shrink-0" />
        ) : (
          startIcon && <span className="inline-flex items-center shrink-0">{startIcon}</span>
        )}
        {children}
        {!isLoading && endIcon && (
          <span className="inline-flex items-center shrink-0">{endIcon}</span>
        )}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
