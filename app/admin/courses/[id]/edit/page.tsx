"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { SiteHeader } from "@/components/navigation/SiteHeader";
import { SiteFooter } from "@/components/navigation/SiteFooter";
import { Container } from "@/components/ui/Container";
import { AdminGuard } from "@/components/admin/AdminGuard";
import { CourseEditor } from "@/components/admin/CourseEditor";
import { loadCustomCourses } from "@/lib/courses/course-store";
import type { Course } from "@/lib/courses/types";

export default function EditCoursePage() {
  const params = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | undefined>();

  useEffect(() => {
    (async () => {
      const match = loadCustomCourses().find((c) => c.id === params.id);
      setCourse(match);
    })();
  }, [params.id]);

  return (
    <AdminGuard>
      <SiteHeader />
      <main className="flex-1 pt-28 pb-20">
        <Container className="max-w-4xl">
          <Link
            href="/admin"
            className="text-xs font-semibold text-royal-700 transition-colors hover:text-royal-800"
          >
            &larr; Back to admin
          </Link>
          <div className="mt-3">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-600">
              Edit course
            </p>
            <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-ink">
              {course?.title ?? "Loading…"}
            </h1>
          </div>
          <div className="mt-8">
            {course ? (
              <CourseEditor course={course} />
            ) : (
              <p className="text-sm text-muted">
                This custom course could not be found. Only custom courses can be
                edited here.
              </p>
            )}
          </div>
        </Container>
      </main>
      <SiteFooter />
    </AdminGuard>
  );
}