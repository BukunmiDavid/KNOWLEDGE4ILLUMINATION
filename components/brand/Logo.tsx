import Image from "next/image";
import { cn } from "@/lib/utils";

export function BrandMark({ className, size = 40 }: { className?: string; size?: number }) {
  return (
    <span
      className={cn("relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-xl", className)}
      style={{ width: size, height: size }}
    >
      <Image
        src="/logo.png"
        alt="K4I logo"
        width={size}
        height={size}
        className="h-full w-full object-contain"
        priority
      />
    </span>
  );
}

export function Logo({
  className,
  wordmarkClassName,
  showWordmark = true,
}: {
  className?: string;
  wordmarkClassName?: string;
  showWordmark?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <BrandMark size={34} />
      {showWordmark ? (
        <span
          className={cn(
            "text-lg font-extrabold leading-tight tracking-tight text-royal-800",
            wordmarkClassName,
          )}
        >
          Knowledge
          <span className="text-gold-600">4</span>Illumination
        </span>
      ) : null}
    </span>
  );
}