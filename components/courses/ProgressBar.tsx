export function ProgressBar({
  percent,
  className,
}: {
  percent: number;
  className?: string;
}) {
  const safe = Math.max(0, Math.min(100, percent));
  return (
    <div
      className={`h-2 w-full overflow-hidden rounded-full bg-royal-100 ${className ?? ""}`}
      role="progressbar"
      aria-valuenow={safe}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full rounded-full bg-gradient-to-r from-royal-600 to-royal-400 transition-all duration-500 ease-out"
        style={{ width: `${safe}%` }}
      />
    </div>
  );
}