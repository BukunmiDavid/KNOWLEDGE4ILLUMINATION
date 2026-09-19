import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { FullSection } from "@/components/ui/FullSection";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <FullSection className="relative overflow-hidden bg-royal-950 text-white">
      {/* Deep glow backdrop */}
      <div className="pointer-events-none absolute -left-40 top-0 h-[30rem] w-[30rem] rounded-full bg-royal-500/20 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-32 top-24 h-80 w-80 rounded-full bg-gold-400/20 blur-3xl" aria-hidden="true" />

      {/* Fine grid overlay for depth */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.7) 1px, transparent 1px)",
          backgroundSize: "3rem 3rem",
        }}
      />

      <Container className="relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <Badge className="mb-6 border-gold-400/30 bg-gold-400/10 text-gold-300">
            KNOW YOURSELF. BUILD YOUR FUTURE.
          </Badge>

          <h1 className="text-balance text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Learn What It Takes to{" "}
            <span className="text-gold-300">See</span>,{" "}
            <span className="text-gold-300">Think</span>,{" "}
            <span className="text-gold-300">Build</span>,{" "}
            <span className="text-gold-300">Grow</span> &{" "}
            <span className="text-gold-300">Lead</span>.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-white/85 sm:text-lg">
            The K4I Leadership &amp; Entrepreneurship Assessment shows you how your current abilities
            translate into the solutions you can actually apply &mdash; at work, in your ventures,
            and in your life. Find out where you stand &mdash; and what to do next.
          </p>

          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/assessments/leadership-entrepreneurship">
              <Button variant="primary" size="lg">Take the Free Assessment</Button>
            </Link>
            <Link href="/#how-it-works">
              <Button variant="ghost" size="lg">How Knowledge Becomes Action</Button>
            </Link>
          </div>
        </div>

        {/* Applicable-solution visual */}
        <div className="mx-auto mt-14 sm:mt-16">
          <ApplyVisual />
        </div>
      </Container>
    </FullSection>
  );
}

const STEPS = [
  { code: "SEE", title: "Spot the opportunity", color: "#1e3a8a" },
  { code: "THINK", title: "Frame the problem", color: "#274ba8" },
  { code: "BUILD", title: "Ship the solution", color: "#3a5cbc" },
  { code: "GROW", title: "Reach the user", color: "#b08e25" },
  { code: "LEAD", title: "Grow the team", color: "#8c701f" },
];

function StepCard({ code, title, color, className }: { code: string; title: string; color: string; className?: string }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col items-center gap-2 sm:gap-3">
      <div
        className="flex h-10 w-10 items-center justify-center rounded-xl text-[9px] font-bold text-white shadow-sm sm:h-12 sm:w-12 sm:rounded-xl sm:text-xs lg:h-14 lg:w-14"
        style={{ backgroundColor: color }}
      >
        {code}
      </div>
      <span className="hidden max-w-[7rem] text-center text-[10px] font-medium leading-tight text-white/85 sm:block lg:text-xs">
        {title}
      </span>
    </div>
  );
}

function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="h-3 w-3 shrink-0 text-gold-400 sm:h-4 sm:w-4" aria-hidden="true">
      <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ApplyVisual() {
  return (
    <div className="flex items-center justify-center gap-1.5 sm:gap-3">
      {STEPS.map((step, i) => (
        <div key={step.code} className="flex items-center gap-1.5 sm:gap-3">
          <StepCard code={step.code} title={step.title} color={step.color} />
          {i < STEPS.length - 1 && <Arrow />}
        </div>
      ))}
      <div className="flex items-center gap-1.5 sm:gap-3">
        <Arrow />
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 text-[8px] font-bold text-white shadow-sm sm:h-12 sm:w-12 sm:rounded-xl sm:text-[10px] lg:h-14 lg:w-14 lg:text-xs">
          IMPACT
        </div>
      </div>
    </div>
  );
}
