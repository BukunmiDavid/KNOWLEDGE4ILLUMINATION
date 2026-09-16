import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { FullSection } from "@/components/ui/FullSection";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export function Hero() {
  return (
    <FullSection className="bg-white pt-24">
      {/* Glow decorations */}
      <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-royal-100/50 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-24 top-32 h-72 w-72 rounded-full bg-gold-100/60 blur-3xl" aria-hidden="true" />

      <Container className="relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <Badge className="mb-6 bg-gold-50 text-gold-700 border-gold-200">KNOW YOURSELF. BUILD YOUR FUTURE.</Badge>

          <h1 className="text-balance text-4xl font-extrabold tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Discover How You{" "}
            <span className="text-royal-700">Think</span>,{" "}
            <span className="text-royal-700">Build</span>,{" "}
            <span className="text-royal-700">Grow</span> &{" "}
            <span className="text-royal-700">Lead</span>.
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
            The K4I Leadership &amp; Entrepreneurship Assessment helps you understand your current
            capabilities across five key areas — and shows you where to grow next.
          </p>

          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/assessments/leadership-entrepreneurship">
              <Button variant="primary" size="lg">Take the Free Assessment</Button>
            </Link>
            <Link href="/#how-it-works">
              <Button variant="secondary" size="lg">How It Works</Button>
            </Link>
          </div>
        </div>

        {/* Capability visual */}
        <div className="mx-auto mt-14 sm:mt-16">
          <CapabilityVisual />
        </div>
      </Container>
    </FullSection>
  );
}

const DOMAINS = [
  { code: "SEE", color: "#1e3a8a" },
  { code: "THINK", color: "#274ba8" },
  { code: "BUILD", color: "#3a5cbc" },
  { code: "GROW", color: "#b08e25" },
  { code: "LEAD", color: "#8c701f" },
];

function DomainTile({ code, className, style }: { code: string; className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={`flex items-center justify-center rounded-lg font-bold text-[10px] text-white shadow-sm sm:rounded-xl sm:text-xs lg:text-sm ${className ?? ""}`}
      style={style}
    >
      {code}
    </div>
  );
}

function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="h-3 w-3 shrink-0 text-gold-500 sm:h-4 sm:w-4" aria-hidden="true">
      <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function CapabilityVisual() {
  return (
    <div className="flex items-center justify-center gap-1.5 sm:gap-3">
      {DOMAINS.map((domain, i) => (
        <div key={domain.code} className="flex items-center gap-1.5 sm:gap-3">
          <DomainTile
            code={domain.code}
            style={{ backgroundColor: domain.color }}
            className="h-9 w-9 lg:h-14 lg:w-14"
          />
          {i < DOMAINS.length - 1 && <Arrow />}
        </div>
      ))}
      <div className="flex items-center gap-1.5 sm:gap-3">
        <Arrow />
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-gold-400 to-gold-600 text-[8px] font-bold text-white shadow-sm sm:h-12 sm:w-12 sm:rounded-xl sm:text-[11px] lg:h-14 lg:w-14 lg:text-sm">
          IMPACT
        </div>
      </div>
    </div>
  );
}