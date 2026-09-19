import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/brand/Logo";
import { cn } from "@/lib/utils";

const links = [
  { href: "/courses", label: "Courses" },
  { href: "/#about", label: "About" },
  { href: "/assessments", label: "Assessments" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "#", label: "Privacy" },
  { href: "#", label: "Terms" },
];

export function SiteFooter({ dark = false }: { dark?: boolean }) {
  return (
    <footer className={cn("w-full border-t bg-transparent", dark ? "border-white/10" : "border-line bg-surface")}>
      <Container className="py-10">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          <div className="flex flex-col items-center gap-2 text-center md:items-start md:text-left">
            <Logo wordmarkClassName={dark ? "text-white" : undefined} />
            <p className={cn("max-w-xs text-xs", dark ? "text-royal-200/70" : "text-faint")}>
              Illuminating Africa through digital, leadership, entrepreneurship, and education.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 md:justify-end">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "text-xs font-medium transition-colors",
                  dark ? "text-royal-100 hover:text-white" : "text-ink-soft hover:text-royal-700",
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div className={cn("mt-8 border-t pt-6 text-center text-xs", dark ? "border-white/10 text-royal-200/50" : "border-line text-faint")}>
          &copy; {new Date().getFullYear()} Knowledge4Illumination. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}