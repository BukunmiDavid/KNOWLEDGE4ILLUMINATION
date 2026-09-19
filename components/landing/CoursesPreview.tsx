import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { FullSection } from "@/components/ui/FullSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { seedCourses } from "@/lib/courses/data";
import { CATEGORY_LABELS } from "@/lib/courses/types";

const featured = seedCourses.slice(0, 3);

export function CoursesPreview() {
  return (
    <FullSection className="bg-white">
      <Container>
        <SectionHeading
          eyebrow="LMS Courses"
          title="Learn practical tech skills."
          description="Choose a course, open a lesson, and watch videos play right here — no switching tabs, no leaving the platform."
        />

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {featured.map((course) => (
            <Link
              key={course.id}
              href={`/courses/${course.slug}`}
              className="group rounded-2xl border border-line bg-surface-raised p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
            >
              <span className="rounded-full bg-royal-100 px-3 py-1 text-xs font-semibold text-royal-800">
                {CATEGORY_LABELS[course.category]}
              </span>
              <h3 className="mt-4 text-lg font-bold leading-snug text-ink group-hover:text-royal-700 transition-colors">
                {course.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm text-muted">
                {course.description}
              </p>
              <p className="mt-4 text-xs font-semibold text-royal-700">
                {course.lessons.length} lessons &middot; Open course &rarr;
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/courses">
            <Button variant="gold" size="lg">
              Browse all courses
            </Button>
          </Link>
        </div>
      </Container>
    </FullSection>
  );
}