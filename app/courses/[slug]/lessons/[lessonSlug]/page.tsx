"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { SiteHeader } from "@/components/navigation/SiteHeader";
import { SiteFooter } from "@/components/navigation/SiteFooter";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { LessonSidebar } from "@/components/courses/LessonSidebar";
import { LessonPlayer } from "@/components/courses/LessonPlayer";
import { useAuth } from "@/lib/auth/useAuth";
import { getCourseBySlug } from "@/lib/courses/course-store";
import { getCourseProgress } from "@/lib/courses/progress-store";
import type { Course, CourseProgress } from "@/lib/courses/types";

export default function LessonPage() {
  const params = useParams<{ slug: string; lessonSlug: string }>();
  const { slug, lessonSlug } = params;
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
                  This course does not exist or was removed.
                </p>
                <Button variant="primary" className="mt-6" asChild>
                  <Link href="/courses">Browse all courses</Link>
                </Button>
              </>
            )}
          </div>
        </main>
        <SiteFooter />
      </>
    );
  }

  const lesson = course.lessons.find((l) => l.id === lessonSlug) ?? course.lessons[0];

  return (
    <>
      <SiteHeader />
      <main className="flex-1 pt-24 pb-16">
        <Container>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_20rem]">
            <LessonPlayer
              course={course}
              lesson={lesson}
              progress={progress}
              userId={hydrated && user ? user.userId : undefined}
              onProgressChange={(p) => setProgress(p)}
            />
            <LessonSidebar
              course={course}
              activeLessonId={lesson.id}
              progress={progress}
            />
          </div>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}