import Link from "next/link";
import { SiteHeader } from "@/components/navigation/SiteHeader";
import { SiteFooter } from "@/components/navigation/SiteFooter";
import { Container } from "@/components/ui/Container";
import { CourseCatalog } from "@/components/courses/CourseCatalog";

export const metadata = {
  title: "Courses",
  description:
    "Browse free, project-based tech courses — coding, design, AI and digital skills — with video lessons that play right here.",
};

export default function CoursesPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 pt-28 pb-20">
        <section className="px-4">
          <Container>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-600">
                Learn by Doing
              </p>
              <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
                Tech Courses, Right Here
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-muted">
                Pick a course, open a lesson, and start watching instantly — no
                juggling tabs. Video lessons play on the page so you can focus on learning.
              </p>
            </div>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3 text-sm">
              <Link
                href="/register"
                className="rounded-full bg-royal-700 px-5 py-2.5 font-semibold text-white shadow-sm transition-all hover:bg-royal-800"
              >
                Create free account
              </Link>
              <span className="text-faint">or</span>
              <Link
                href="/login"
                className="rounded-full border border-line-strong bg-white px-5 py-2.5 font-semibold text-ink transition-colors hover:border-royal-400 hover:text-royal-700"
              >
                Sign in to track progress
              </Link>
            </div>
          </Container>
        </section>

        <CourseCatalog className="mt-14" />

        <section className="mt-20 px-4">
          <Container>
            <div className="rounded-2xl border border-line bg-surface p-8 text-center sm:p-10">
              <h2 className="text-2xl font-bold text-ink">Are you an educator?</h2>
              <p className="mx-auto mt-2 max-w-xl text-muted">
                Want to publish your own courses and video lessons? Send us an
                access request — our team reviews it, then we give you educator
                access to add content.
              </p>
              <Link
                href="/educator"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-royal-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-royal-800"
              >
                Request educator access
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </Link>
            </div>
          </Container>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}