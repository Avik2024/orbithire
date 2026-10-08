import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "bordered" | "flat";
  hoverable?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", hoverable = false, children, ...props }, ref) => {
    const variantStyles = {
      default:
        "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm",
      bordered:
        "bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700",
      flat: "bg-slate-50 dark:bg-slate-800/50 border-none",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl overflow-hidden transition-all",
          variantStyles[variant],
          hoverable &&
            "hover:border-slate-300 hover:shadow-md dark:hover:border-slate-700 cursor-pointer",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = "Card";

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 p-6 pb-4", className)}
      {...props}
    >
      {children}
    </div>
  )
);
CardHeader.displayName = "CardHeader";

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, as: Component = "h3", children, ...props }, ref) => (
    <Component
      ref={ref}
      className={cn(
        "text-lg font-semibold leading-none tracking-tight text-slate-900 dark:text-slate-100",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
);
CardTitle.displayName = "CardTitle";

export interface CardDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

export const CardDescription = forwardRef<
  HTMLParagraphElement,
  CardDescriptionProps
>(({ className, children, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-slate-500 dark:text-slate-400", className)}
    {...props}
  >
    {children}
  </p>
));
CardDescription.displayName = "CardDescription";

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props}>
      {children}
    </div>
  )
);
CardContent.displayName = "CardContent";

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center p-6 pt-0 border-t border-slate-100 dark:border-slate-800 mt-4 pt-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
CardFooter.displayName = "CardFooter";