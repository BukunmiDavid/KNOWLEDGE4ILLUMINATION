import { cn } from "@/lib/utils";

export function Card({
  className,
  children,
  style,
}: {
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-line bg-surface-raised shadow-card",
        className,
      )}
      style={style}
    >
      {children}
    </div>
  );
}