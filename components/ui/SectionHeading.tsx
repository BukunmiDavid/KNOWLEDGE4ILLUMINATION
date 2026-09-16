import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow ? (
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-600">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="max-w-2xl text-balance text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-pretty text-base leading-relaxed text-muted">
          {description}
        </p>
      ) : null}
    </div>
  );
}