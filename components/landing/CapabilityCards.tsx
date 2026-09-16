import { Container } from "@/components/ui/Container";
import { FullSection } from "@/components/ui/FullSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

const cards = [
  {
    icon: "eye",
    title: "SEE",
    subtitle: "Recognize Problems & Opportunities",
    description: "Understand how well you observe your environment, identify meaningful problems, recognize opportunities, and understand users.",
    color: "from-royal-600 to-royal-800",
  },
  {
    icon: "brain",
    title: "THINK",
    subtitle: "Reason, Question & Decide",
    description: "Understand how you analyze problems, evaluate evidence, assess risk, think strategically, and make decisions under uncertainty.",
    color: "from-royal-500 to-royal-700",
  },
  {
    icon: "hammer",
    title: "BUILD",
    subtitle: "Turn Ideas Into Action",
    description: "Understand how you plan, execute, experiment, test, validate, adapt, and build solutions.",
    color: "from-royal-400 to-royal-600",
  },
  {
    icon: "trending",
    title: "GROW",
    subtitle: "Create Sustainable Value",
    description: "Understand how you think about customers, value propositions, pricing, marketing, sales, revenue, business models, and sustainability.",
    color: "from-gold-500 to-gold-700",
  },
  {
    icon: "users",
    title: "LEAD",
    subtitle: "Lead Yourself & Others",
    description: "Understand how you communicate, collaborate, manage conflict, take responsibility, influence others, and lead ethically.",
    color: "from-gold-400 to-gold-600",
  },
];

function CapabilityIcon({ icon }: { icon: string }) {
  const size = "h-5 w-5";
  switch (icon) {
    case "eye":
      return (
        <svg className={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
      );
    case "brain":
      return (
        <svg className={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a4 4 0 0 0-4 4v2a4 4 0 0 0-4 4 4 4 0 0 0 4 4h1v3a2 2 0 0 0 4 0v-3h1a4 4 0 0 0 4-4 4 4 0 0 0-4-4V6a4 4 0 0 0-4-4z"/>
        </svg>
      );
    case "hammer":
      return (
        <svg className={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 12l-8.5 8.5c-.83.83-2.17.83-3 0s-.83-2.17 0-3L12 9"/>
          <path d="M17.64 15L22 10.64"/>
          <path d="M20.91 11.7l-1.25-1.25c-.6-.6-.93-1.4-.93-2.25V7a2 2 0 0 1 2-2h2.16"/>
        </svg>
      );
    case "trending":
      return (
        <svg className={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
          <polyline points="16 7 22 7 22 13"/>
        </svg>
      );
    case "users":
      return (
        <svg className={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      );
    default:
      return null;
  }
}

export function WhySection() {
  return (
    <FullSection id="about" className="bg-white">
      <Container>
        <SectionHeading
          eyebrow="Why Take This Assessment"
          title="You can't improve what you don't understand."
          description="The K4I assessment helps you understand how you identify problems, think through decisions, turn ideas into action, create value, and lead yourself and others."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {cards.map((card, index) => (
            <Card
              key={card.title}
              className={`group relative flex flex-col gap-4 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift animate-fade-up`}
              style={{ animationDelay: `${index * 60}ms` } as React.CSSProperties}
            >
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${card.color} text-white shadow-sm`}>
                <CapabilityIcon icon={card.icon} />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-ink">{card.title}</h3>
                <p className="text-xs font-semibold text-gold-600">{card.subtitle}</p>
              </div>
              <p className="text-sm leading-relaxed text-muted">{card.description}</p>
            </Card>
          ))}
        </div>
      </Container>
    </FullSection>
  );
}