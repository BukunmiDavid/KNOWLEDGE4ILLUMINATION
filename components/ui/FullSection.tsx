import { cn } from "@/lib/utils";

export function FullSection({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative flex min-h-svh w-full flex-col items-center justify-center overflow-hidden",
        className,
      )}
    >
      {children}
    </section>
  );
}