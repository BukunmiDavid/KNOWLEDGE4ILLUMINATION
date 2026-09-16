import { cn } from "@/lib/utils";

/**
 * Decorative illumination glow used behind hero and CTA sections.
 * Pure CSS/SVG, lightweight, no images.
 */
export function BrandGradient({
  className,
  variant = "royal",
}: {
  className?: string;
  variant?: "royal" | "gold";
}) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute select-none", className)}
    >
      <div
        className={cn(
          "h-72 w-72 rounded-full blur-3xl",
          variant === "royal"
            ? "bg-royal-200/60"
            : "bg-gold-200/70",
        )}
      />
    </div>
  );
}