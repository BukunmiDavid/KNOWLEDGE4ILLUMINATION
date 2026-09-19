"use client";

import Link from "next/link";
import { SiteHeader } from "@/components/navigation/SiteHeader";
import { SiteFooter } from "@/components/navigation/SiteFooter";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { AdminGuard } from "@/components/admin/AdminGuard";
import { EducatorRequests } from "@/components/admin/EducatorRequests";
import { getAllCourses, deleteCustomCourse } from "@/lib/courses/course-store";
import { CATEGORY_LABELS } from "@/lib/courses/types";
import { useState, useEffect } from "react";

export default function AdminPage() {
  const [courses, setCourses] = useState(() => getAllCourses());

  const refresh = () => setCourses(getAllCourses());
  useEffect(() => {
    (async () => {
      refresh();
    })();
  }, []);

  const handleDelete = (id: string) => {
    if (!confirm("Delete this course and all its lessons?")) return;
    deleteCustomCourse(id);
    refresh();
  };

  return (
    <AdminGuard>
      <SiteHeader />
      <main className="flex-1 pt-28 pb-20">
        <Container>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-600">
                Admin
              </p>
              <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
                Manage Courses
              </h1>
              <p className="mt-2 text-muted">
                Add new courses, link YouTube videos and edit content for your learners.
              </p>
            </div>
            <Button variant="primary" size="lg" asChild>
              <Link href="/admin/courses/new">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14M5 12h14" />
                </svg>
                New Course
              </Link>
            </Button>
          </div>

          <div className="mt-10 flex flex-col gap-4">
            {courses.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-line-strong p-12 text-center">
                <p className="text-sm text-muted">No courses yet — create your first one!</p>
              </div>
            ) : (
              courses.map((course) => (
                <Card
                  key={course.id}
                  className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-royal-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-royal-700">
                        {CATEGORY_LABELS[course.category]}
                      </span>
                      {course.isCustom ? (
                        <span className="rounded-full bg-gold-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gold-700">
                          Custom
                        </span>
                      ) : (
                        <span className="rounded-full border border-line-strong px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-faint">
                          Built-in
                        </span>
                      )}
                    </div>
                    <h3 className="mt-2 text-lg font-bold text-ink">
                      {course.title}
                    </h3>
                    <p className="mt-1 line-clamp-1 text-sm text-muted">
                      {course.description}
                    </p>
                    <p className="mt-1 text-xs text-faint">
                      {course.lessons.length} lessons &middot; {course.level}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/courses/${course.slug}`}>
                        View
                      </Link>
                    </Button>
                    {course.isCustom ? (
                      <>
                        <Button variant="secondary" size="sm" asChild>
                          <Link href={`/admin/courses/${course.id}/edit`}>
                            Edit
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(course.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Delete
                        </Button>
                      </>
                    ) : null}
                  </div>
                </Card>
              ))
            )}
          </div>

          <EducatorRequests />
        </Container>
      </main>
      <SiteFooter />
    </AdminGuard>
  );
}