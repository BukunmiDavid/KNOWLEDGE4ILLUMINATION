import { cn } from "@/lib/utils";
import { FieldError } from "@/components/ui/FieldError";

export interface SelectOption {
  value: string;
  label: string;
}

export function Select({
  className,
  label,
  options,
  error,
  placeholder,
  id,
  name,
  ...props
}: Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "children"> & {
  label?: string;
  options: SelectOption[];
  error?: string | null;
  placeholder?: string;
}) {
  const selectId = id ?? name;
  return (
    <div className="flex flex-col gap-1.5">
      {label ? (
        <label
          htmlFor={selectId}
          className="text-sm font-semibold text-ink"
        >
          {label}
        </label>
      ) : null}
      <select
        id={selectId}
        name={name}
        aria-invalid={error ? true : undefined}
        className={cn(
          "h-11 w-full appearance-none rounded-xl border border-line-strong bg-white px-3.5 text-sm text-ink transition-colors hover:border-line-strong focus:border-royal-500 focus:outline-none focus:ring-2 focus:ring-royal-100",
          "bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke%3D%22%235d6b84%22%20stroke-width%3D%222%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:16px] bg-[right_0.9rem_center] bg-no-repeat pr-9",
          error && "border-red-500 focus:border-red-500 focus:ring-red-100",
          placeholder && "text-ink",
          className,
        )}
        {...props}
      >
        {placeholder ? (
          <option value="" disabled>
            {placeholder}
          </option>
        ) : null}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error ? <FieldError id={`${selectId}-error`}>{error}</FieldError> : null}
    </div>
  );
}