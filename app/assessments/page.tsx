import Link from "next/link";
import { SiteHeader } from "@/components/navigation/SiteHeader";
import { SiteFooter } from "@/components/navigation/SiteFooter";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const assessments = [
  {
    slug: "leadership-entrepreneurship",
    title: "Leadership & Entrepreneurship Assessment",
    description: "Discover how you currently see opportunities, think through problems, build solutions, create value, and lead.",
    tags: ["Leadership", "Entrepreneurship", "Self-Assessment", "Free"],
    live: true,
  },
  { slug: "digital-skills", title: "Digital Skills Assessment", tags: ["Digital", "Coming Soon"], live: false },
  { slug: "ai-readiness", title: "AI Readiness Assessment", tags: ["AI", "Coming Soon"], live: false },
  { slug: "career-readiness", title: "Career Readiness Assessment", tags: ["Career", "Coming Soon"], live: false },
];

export default function AssessmentsPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 pt-28 pb-20">
        <Container>
          <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">Assessments</h1>
          <p className="mt-3 max-w-xl text-muted">Choose an assessment to discover where you stand and where to grow next.</p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {assessments.map((a) => (
              <Card key={a.slug} className="flex flex-col gap-4 p-6">
                <div className="flex flex-wrap gap-2">
                  {a.tags.map((tag) => (
                    <Badge key={tag} className={a.live ? "" : "bg-surface text-faint border-line"}>
                      {tag}
                    </Badge>
                  ))}
                </div>
                <h2 className="text-lg font-bold text-ink">{a.title}</h2>
                {a.description && <p className="text-sm text-muted">{a.description}</p>}
                <div className="mt-auto pt-2">
                  {a.live ? (
                    <Link href={`/assessments/${a.slug}`}>
                      <Button variant="primary" size="sm">Take Assessment</Button>
                    </Link>
                  ) : (
                    <Button variant="secondary" size="sm" disabled>Coming Soon</Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}