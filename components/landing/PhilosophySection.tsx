import { Container } from "@/components/ui/Container";
import { FullSection } from "@/components/ui/FullSection";
import { SectionHeading } from "@/components/ui/SectionHeading";

const philosophy = ["KNOW", "UNDERSTAND", "PRACTICE", "APPLY", "SOLVE", "BUILD", "CREATE VALUE", "CREATE IMPACT"];

export function PhilosophySection() {
  return (
    <FullSection className="bg-white">
      <Container>
        <SectionHeading
          eyebrow="K4I Philosophy"
          title="From Knowledge to Impact."
          description="Every step forward begins with understanding where you are today."
        />
        <div className="mx-auto mt-12 flex max-w-3xl flex-col items-center gap-0">
          {philosophy.map((step, i) => (
            <div key={step} className="flex flex-col items-center">
              <div
                className={`flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-bold sm:px-6 sm:py-3 ${
                  i < 3
                    ? "bg-royal-700 text-white"
                    : i < 5
                      ? "bg-royal-500 text-white"
                      : i < 7
                        ? "bg-gold-500 text-royal-900"
                        : "bg-gradient-to-r from-gold-500 to-gold-600 text-royal-900"
                }`}
              >
                {step}
              </div>
              {i < philosophy.length - 1 && (
                <svg width="16" height="20" viewBox="0 0 16 20" fill="none" className="my-0.5 text-gold-400" aria-hidden="true">
                  <path d="M8 0v16M2 10l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
          ))}
        </div>
      </Container>
    </FullSection>
  );
}