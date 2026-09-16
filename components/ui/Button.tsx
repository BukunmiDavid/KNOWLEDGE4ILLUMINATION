import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "gold" | "ghost" | "text";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 ease-out select-none disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 active:scale-[0.98]";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-royal-700 text-white shadow-sm hover:bg-royal-800 hover:shadow-md",
  secondary:
    "border border-line-strong bg-white text-ink hover:border-royal-400 hover:text-royal-700",
  gold:
    "bg-gold-500 text-royal-950 shadow-sm hover:bg-gold-400 hover:shadow-md",
  ghost:
    "bg-transparent text-royal-700 hover:bg-royal-50",
  text: "bg-transparent text-royal-700 underline-offset-4 hover:underline",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-13 px-8 text-base",
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", size = "md", type = "button", ...props },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export function buttonClassName(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className?: string,
) {
  return cn(base, variants[variant], sizes[size], className);
}