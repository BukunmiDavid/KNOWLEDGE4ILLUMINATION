import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/Label";
import { FieldError } from "@/components/ui/FieldError";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string | null;
  hint?: string;
}

export function Textarea({
  className,
  label,
  error,
  hint,
  id,
  ...props
}: TextareaProps) {
  const textareaId = id ?? props.name;
  return (
    <div className="flex flex-col gap-1.5">
      {label ? <Label htmlFor={textareaId}>{label}</Label> : null}
      <textarea
        id={textareaId}
        aria-invalid={error ? true : undefined}
        aria-describedby={
          error ? `${textareaId}-error` : hint ? `${textareaId}-hint` : undefined
        }
        className={cn(
          "w-full rounded-xl border border-line-strong bg-white px-3.5 py-3 text-sm text-ink placeholder:text-faint transition-colors focus:border-royal-500 focus:outline-none focus:ring-2 focus:ring-royal-100",
          error && "border-red-500 focus:border-red-500 focus:ring-red-100",
          className,
        )}
        {...props}
      />
      {hint && !error ? (
        <p id={`${textareaId}-hint`} className="text-xs text-faint">
          {hint}
        </p>
      ) : null}
      {error ? <FieldError id={`${textareaId}-error`}>{error}</FieldError> : null}
    </div>
  );
}