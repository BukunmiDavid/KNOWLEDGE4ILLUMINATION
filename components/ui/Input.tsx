import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/Label";
import { FieldError } from "@/components/ui/FieldError";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string | null;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const inputId = id ?? props.name;
    return (
      <div className="flex flex-col gap-1.5">
        {label ? (
          <Label htmlFor={inputId}>{label}</Label>
        ) : null}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          className={cn(
            "h-11 w-full rounded-xl border border-line-strong bg-white px-3.5 text-sm text-ink placeholder:text-faint transition-colors focus:border-royal-500 focus:outline-none focus:ring-2 focus:ring-royal-100",
            error && "border-red-500 focus:border-red-500 focus:ring-red-100",
            className,
          )}
          {...props}
        />
        {hint && !error ? (
          <p id={`${inputId}-hint`} className="text-xs text-faint">
            {hint}
          </p>
        ) : null}
        {error ? <FieldError id={`${inputId}-error`}>{error}</FieldError> : null}
      </div>
    );
  },
);
Input.displayName = "Input";