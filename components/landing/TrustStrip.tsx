import { Container } from "@/components/ui/Container";
import { FullSection } from "@/components/ui/FullSection";

const stats = [
  { value: "5", label: "Capability Areas" },
  { value: "Real", label: "World Thinking" },
  { value: "Personalized", label: "Insights" },
  { value: "Free", label: "to Take" },
];

export function TrustStrip() {
  return (
    <FullSection className="border-y border-line bg-surface">
      <Container>
        <div className="grid gap-12 text-center sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-2">
              <span className="text-4xl font-extrabold tracking-tight text-royal-700 sm:text-5xl lg:text-6xl">
                {stat.value}
              </span>
              <span className="text-sm font-semibold text-muted sm:text-base">{stat.label}</span>
            </div>
          ))}
        </div>
      </Container>
    </FullSection>
  );
}