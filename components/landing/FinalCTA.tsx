import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { FullSection } from "@/components/ui/FullSection";
import { Button } from "@/components/ui/Button";

export function FinalCTA({ children }: { children?: React.ReactNode }) {
  return (
    <FullSection className="bg-gradient-to-br from-royal-800 via-royal-700 to-royal-900">
      <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-gold-400/10 blur-3xl" aria-hidden="true" />

      <div className="relative z-10 flex w-full flex-1 flex-col items-center justify-center">
        <Container className="text-center">
          <h2 className="mx-auto max-w-2xl text-balance text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Your next level starts with understanding where you are today.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-sm leading-relaxed text-royal-200 sm:text-base">
            Take the K4I Leadership &amp; Entrepreneurship Assessment and discover where your
            strengths can take you — and where your next growth opportunity lies.
          </p>
          <Link href="/assessments/leadership-entrepreneurship" className="mt-8 inline-block">
            <Button variant="gold" size="lg">Take the Free Assessment</Button>
          </Link>
        </Container>
      </div>

      {children}
    </FullSection>
  );
}