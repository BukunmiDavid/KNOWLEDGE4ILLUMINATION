import Link from "next/link";
import { SiteHeader } from "@/components/navigation/SiteHeader";
import { SiteFooter } from "@/components/navigation/SiteFooter";
import { AssessmentHero } from "@/components/assessments/AssessmentHero";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

const features = [
  { icon: "grid", label: "5 Capability Areas" },
  { icon: "clock", label: "12 minutes estimated" },
  { icon: "gift", label: "Free" },
  { icon: "user", label: "No Account Required" },
];

function FeatureIcon({ icon }: { icon: string }) {
  const s = "h-5 w-5";
  switch (icon) {
    case "grid":
      return <svg className={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>;
    case "clock":
      return <svg className={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>;
    case "gift":
      return <svg className={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/></svg>;
    case "user":
      return <svg className={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
    default:
      return null;
  }
}

export default function AssessmentIntro() {
  return (
    <>
      <SiteHeader />
      <AssessmentHero />
      <main className="flex-1 pt-28 pb-20">
        <Container className="max-w-3xl">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Leadership &amp; Entrepreneurship Assessment
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-muted leading-relaxed">
              This assessment is designed to help you understand how you currently see
              opportunities, think through problems, build solutions, create value, and lead.
            </p>
          </div>

          <Card className="mx-auto mt-10 grid grid-cols-2 gap-6 p-8 sm:grid-cols-4">
            {features.map((f) => (
              <div key={f.label} className="flex flex-col items-center gap-2 text-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-royal-50 text-royal-700">
                  <FeatureIcon icon={f.icon} />
                </div>
                <span className="text-sm font-semibold text-ink">{f.label}</span>
              </div>
            ))}
          </Card>

          <div className="mt-10 flex justify-center">
            <Link href="/assessments/leadership-entrepreneurship/details">
              <Button variant="primary" size="lg">Begin Assessment</Button>
            </Link>
          </div>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
