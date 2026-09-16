import { Container } from "@/components/ui/Container";
import { FullSection } from "@/components/ui/FullSection";
import { SectionHeading } from "@/components/ui/SectionHeading";

const steps = [
  { num: "01", title: "Tell Us About You", description: "Provide basic information about yourself." },
  { num: "02", title: "Answer Honestly", description: "Respond to questions about how you think, act, solve problems, build, and lead." },
  { num: "03", title: "Discover Your Profile", description: "Receive an assessment of your current capability areas." },
  { num: "04", title: "Download Your Results", description: "Get a downloadable report you can keep and review." },
];

export function HowItWorks() {
  return (
    <FullSection id="how-it-works" className="bg-surface">
      <Container>
        <SectionHeading
          eyebrow="How It Works"
          title="Four simple steps to your capability profile."
          description="The assessment is designed to be quick, insightful, and immediately useful."
        />
        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div key={step.num} className="flex flex-col items-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-royal-700 text-lg font-extrabold text-white shadow-sm sm:h-16 sm:w-16 sm:text-xl">
                {step.num}
              </div>
              <h3 className="mt-4 text-base font-bold text-ink">{step.title}</h3>
              <p className="mt-2 max-w-[220px] text-sm text-muted">{step.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </FullSection>
  );
}