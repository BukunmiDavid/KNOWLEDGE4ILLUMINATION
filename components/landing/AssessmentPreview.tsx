import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { FullSection } from "@/components/ui/FullSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

const options = ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"];

export function AssessmentPreview() {
  return (
    <FullSection className="bg-white">
      <Container>
        <SectionHeading
          eyebrow="Assessment Preview"
          title="See what the experience looks like."
          description="A beautiful, distraction-free question experience designed to let you focus on what matters — your thinking."
        />
        <div className="mx-auto mt-12 w-full max-w-2xl">
          <Card className="p-6 sm:p-10">
            <div className="flex items-center gap-3 mb-6">
              <span className="rounded-lg bg-gold-100 px-2.5 py-1 text-xs font-bold text-gold-700">SEE</span>
              <span className="text-xs text-faint">Question 1 of 10</span>
            </div>
            <p className="text-lg font-bold text-ink leading-relaxed">
              When you notice a problem affecting people around you, what do you usually do first?
            </p>
            <div className="mt-6 space-y-3">
              {options.map((option, i) => (
                <div
                  key={option}
                  className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm transition-all ${
                    i === 3
                      ? "border-royal-400 bg-royal-50 text-royal-800 shadow-sm"
                      : "border-line text-ink hover:border-royal-200 hover:bg-surface"
                  }`}
                >
                  <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${
                    i === 3 ? "border-royal-600" : "border-faint"
                  }`}>
                    {i === 3 && <span className="h-2 w-2 rounded-full bg-royal-600" />}
                  </span>
                  {option}
                </div>
              ))}
            </div>
            <div className="mt-8 flex justify-end">
              <Link href="/assessments/leadership-entrepreneurship">
                <Button variant="gold" size="md">Start My Assessment</Button>
              </Link>
            </div>
          </Card>
        </div>
      </Container>
    </FullSection>
  );
}