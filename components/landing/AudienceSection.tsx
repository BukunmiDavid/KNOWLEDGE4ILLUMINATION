import { Container } from "@/components/ui/Container";
import { FullSection } from "@/components/ui/FullSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

const audiences = [
  { icon: "🎓", title: "Students", description: "Understand strengths and areas for development." },
  { icon: "💼", title: "Young Professionals", description: "Identify capabilities that can accelerate career growth." },
  { icon: "🚀", title: "Entrepreneurs", description: "Understand how you approach opportunities, decisions, execution, and growth." },
  { icon: "🏆", title: "Leaders", description: "Reflect on leadership and organizational capabilities." },
  { icon: "📈", title: "Career Builders", description: "Understand where to focus your development." },
];

export function AudienceSection() {
  return (
    <FullSection className="bg-surface">
      <Container>
        <SectionHeading
          eyebrow="Who Is This For?"
          title="Built for anyone ready to grow."
          description="Whether you are starting out or leading an organization, this assessment gives you a clear picture of where you stand."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {audiences.map((a) => (
            <Card key={a.title} className="flex flex-col items-center p-6 text-center">
              <span className="text-3xl" aria-hidden="true">{a.icon}</span>
              <h3 className="mt-3 text-sm font-bold text-ink">{a.title}</h3>
              <p className="mt-1 text-xs text-muted">{a.description}</p>
            </Card>
          ))}
        </div>
      </Container>
    </FullSection>
  );
}