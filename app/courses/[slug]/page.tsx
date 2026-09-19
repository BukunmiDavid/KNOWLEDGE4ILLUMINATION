"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { SiteHeader } from "@/components/navigation/SiteHeader";
import { SiteFooter } from "@/components/navigation/SiteFooter";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  IconArrowRight,
  IconClock,
  IconCheck,
  IconAward,
} from "@/components/ui/icons";
import { ProgressBar } from "@/components/courses/ProgressBar";
import { useAuth } from "@/lib/auth/useAuth";
import { getCourseBySlug } from "@/lib/courses/course-store";
import {
  getCourseProgress,
  resetCourseProgress,
} from "@/lib/courses/progress-store";
import type { Course, CourseProgress } from "@/lib/courses/types";
import { CATEGORY_LABELS, courseDurationMinutes, progressPercent } from "@/lib/courses/types";
import { extractYouTubeId, buildThumbnailUrl } from "@/lib/courses/youtube";
import { cn } from "@/lib/utils";

export default function CourseDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const { user, hydrated } = useAuth();

  const [course, setCourse] = useState<Course | null>(null);
  const [progress, setProgress] = useState<CourseProgress | undefined>();

  useEffect(() => {
    (async () => {
      const found = getCourseBySlug(slug);
      setCourse(found ?? null);
    })();
  }, [slug]);

  useEffect(() => {
    (async () => {
      if (!hydrated || !user) {
        setProgress(undefined);
        return;
      }
      setProgress(getCourseProgress(user.userId, slug));
    })();
  }, [hydrated, user, slug]);

  if (!course) {
    return (
      <>
        <SiteHeader />
        <main className="flex flex-1 items-center justify-center pt-28 pb-20 px-4">
          <div className="text-center">
            {!hydrated ? (
              <p className="text-sm text-muted">Loading course&hellip;</p>
            ) : (
              <>
                <h1 className="text-2xl font-bold text-ink">Course not found</h1>
                <p className="mt-2 text-muted">
                  The course you are looking for does not exist or was removed.
                </p>
                <Link href="/courses">
                  <Button variant="primary" className="mt-6">Browse all courses</Button>
                </Link>
              </>
            )}
          </div>
        </main>
        <SiteFooter />
      </>
    );
  }

  const percent = progress ? progressPercent(progress, course.lessons.length) : 0;
  const duration = courseDurationMinutes(course);
  const hours = Math.floor(duration / 60);
  const mins = duration % 60;
  const durationLabel = hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  const firstIncomplete =
    course.lessons.find((l) => !progress?.completedLessonIds.includes(l.id)) ??
    course.lessons[0];
  const heroThumbId = extractYouTubeId(course.lessons[0]?.videoUrl);

  const resetProgress = () => {
    if (!user) return;
    resetCourseProgress(user.userId, course.slug);
    setProgress(undefined);
  };

  return (
    <>
      <SiteHeader />
      <main className="flex-1 pt-24 pb-20">
        {/* Hero */}
        <section className="border-b border-line bg-surface">
          <Container className="py-12">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-royal-100 px-3 py-1 text-xs font-semibold text-royal-800">
                    {CATEGORY_LABELS[course.category]}
                  </span>
                  <span className="rounded-full border border-line-strong bg-white px-3 py-1 text-xs font-semibold text-ink-soft">
                    {course.level}
                  </span>
                  {course.isCustom ? (
                    <span className="rounded-full bg-gold-100 px-3 py-1 text-xs font-semibold text-gold-700">
                      Custom course
                    </span>
                  ) : null}
                </div>
                <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
                  {course.title}
                </h1>
                <p className="mt-3 max-w-xl text-base leading-relaxed text-muted">
                  {course.description}
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-faint">
                  <span className="inline-flex items-center gap-1.5">
                    <IconClock />
                    {durationLabel} total
                  </span>
                  <span>{course.lessons.length} lessons</span>
                  <span>Free forever</span>
                </div>
                <div className="mt-7 flex flex-wrap gap-3">
                  {progress?.lastLessonId ? (
                    <Button variant="primary" size="lg" asChild>
                      <Link href={`/courses/${course.slug}/lessons/${progress.lastLessonId}`}>
                        Resume where you left off
                        <IconArrowRight />
                      </Link>
                    </Button>
                  ) : (
                    <Button variant="primary" size="lg" asChild>
                      <Link href={`/courses/${course.slug}/lessons/${firstIncomplete.id}`}>
                        Start Course
                        <IconArrowRight />
                      </Link>
                    </Button>
                  )}
                  <Button variant="ghost" size="lg" asChild>
                    <Link href="/courses">Browse all</Link>
                  </Button>
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl shadow-lift">
                {heroThumbId ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={buildThumbnailUrl(heroThumbId)}
                    alt={`${course.title} preview`}
                    className="aspect-video w-full object-cover"
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={course.image}
                    alt={course.title}
                    className="aspect-video w-full object-cover"
                  />
                )}
              </div>
            </div>
          </Container>
        </section>

        {/* Progress + syllabus */}
        <Container className="py-12">
          {user ? (
            <Card className="mb-10 p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex-1">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-sm font-bold text-ink">Your progress</p>
                    <p className="text-sm font-bold text-royal-700">{percent}%</p>
                  </div>
                  <ProgressBar percent={percent} />
                  <p className="mt-2 text-xs text-faint">
                    {progress ? progress.completedLessonIds.length : 0} of{" "}
                    {course.lessons.length} lessons completed
                  </p>
                </div>
                {percent > 0 ? (
                  <button
                    onClick={resetProgress}
                    className="self-start text-xs font-semibold text-faint transition-colors hover:text-red-600 sm:self-auto"
                  >
                    Reset progress
                  </button>
                ) : null}
              </div>
            </Card>
          ) : (
            <Card className="mb-10 flex flex-col items-center gap-3 p-6 text-center sm:flex-row sm:text-left">
              <div className="flex-1">
                <p className="text-sm font-bold text-ink">Track your learning</p>
                <p className="text-sm text-muted">
                  Sign in for free to save progress and earn a completion badge.
                </p>
              </div>
              <Button variant="secondary" size="md" asChild>
                <Link href="/login">Sign in</Link>
              </Button>
            </Card>
          )}

          <h2 className="text-2xl font-bold text-ink">Course Lessons</h2>
          <p className="mt-1 text-sm text-muted">
            Lessons play right on the page — no leaving the platform.
          </p>

          <div className="mt-6 flex flex-col gap-3">
            {course.lessons.map((lesson, index) => {
              const done = progress?.completedLessonIds.includes(lesson.id) ?? false;
              const isCurrent = progress?.lastLessonId === lesson.id;
              return (
                <Link
                  key={lesson.id}
                  href={`/courses/${course.slug}/lessons/${lesson.id}`}
                  className={cn(
                    "group flex items-center gap-4 rounded-2xl border bg-surface-raised p-4 transition-all hover:-translate-y-0.5 hover:shadow-lift",
                    isCurrent ? "border-royal-400 ring-2 ring-royal-100" : "border-line",
                  )}
                >
                  <span
                    className={cn(
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold",
                      done
                        ? "bg-gold-500 text-royal-950"
                        : "bg-royal-50 text-royal-700",
                    )}
                  >
                    {done ? (
                      <IconCheck className="h-4 w-4" />
                    ) : (
                      index + 1
                    )}
                  </span>
                  <div className="flex-1">
                    <p className="font-semibold text-ink group-hover:text-royal-700 transition-colors">
                      {lesson.title}
                    </p>
                    {lesson.description ? (
                      <p className="mt-0.5 line-clamp-1 text-sm text-muted">
                        {lesson.description}
                      </p>
                    ) : null}
                  </div>
                  <span className="hidden text-xs text-faint sm:block">
                    {lesson.durationMinutes} min
                  </span>
                  <IconArrowRight
                    className="h-[18px] w-[18px] text-faint transition-transform group-hover:translate-x-0.5"
                  />
                </Link>
              );
            })}
          </div>

          {user && percent === 100 ? (
            <div className="mt-10 rounded-2xl border border-gold-300 bg-gold-50 p-8 text-center">
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold-500 text-royal-950">
                <IconAward className="h-8 w-8" />
              </span>
              <h3 className="mt-4 text-xl font-bold text-ink">Course completed!</h3>
              <p className="mt-1 text-sm text-muted">
                Congratulations — you finished every lesson. Keep going!
              </p>
            </div>
          ) : null}
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}