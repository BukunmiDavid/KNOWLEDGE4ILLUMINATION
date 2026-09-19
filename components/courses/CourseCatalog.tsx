"use client";

import { useEffect, useMemo, useState } from "react";
import { Container } from "@/components/ui/Container";
import { CourseCard } from "@/components/courses/CourseCard";
import { useAuth } from "@/lib/auth/useAuth";
import {
  getAllCourses,
  deleteCustomCourse,
} from "@/lib/courses/course-store";
import type { Category } from "@/lib/courses/types";
import { CATEGORY_LABELS } from "@/lib/courses/types";
import { cn } from "@/lib/utils";

const FILTERS: Array<{ value: Category | "all"; label: string }> = [
  { value: "all", label: "All Courses" },
  { value: "web-development", label: CATEGORY_LABELS["web-development"] },
  { value: "python", label: CATEGORY_LABELS.python },
  { value: "design", label: CATEGORY_LABELS.design },
  { value: "ai", label: CATEGORY_LABELS.ai },
  { value: "digital-literacy", label: CATEGORY_LABELS["digital-literacy"] },
];

export function CourseCatalog({ className }: { className?: string }) {
  const { user, hydrated } = useAuth();
  const [filter, setFilter] = useState<Category | "all">("all");
  const [courses, setCourses] = useState(() => getAllCourses());

  const refresh = () => setCourses(getAllCourses());

  useEffect(() => {
    (async () => {
      refresh();
    })();
  }, []);

  const visible = useMemo(
    () => (filter === "all" ? courses : courses.filter((c) => c.category === filter)),
    [courses, filter],
  );

  return (
    <section className={cn("px-4", className)}>
      <Container>
        <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold transition-all",
                filter === f.value
                  ? "bg-royal-700 text-white shadow-sm"
                  : "border border-line-strong bg-white text-ink-soft hover:border-royal-400 hover:text-royal-700",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {visible.length === 0 ? (
          <p className="py-16 text-center text-muted">
            No courses in this category yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                userId={hydrated && user ? user.userId : undefined}
                isCustom={course.isCustom}
                onDelete={
                  user?.role === "admin" && course.isCustom
                    ? (id) => {
                        deleteCustomCourse(id);
                        refresh();
                      }
                    : undefined
                }
              />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}