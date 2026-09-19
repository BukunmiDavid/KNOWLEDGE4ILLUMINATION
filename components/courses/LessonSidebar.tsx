"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Course, CourseProgress } from "@/lib/courses/types";
import { extractYouTubeId } from "@/lib/courses/youtube";

export function LessonSidebar({
  course,
  activeLessonId,
  progress,
}: {
  course: Course;
  activeLessonId: string;
  progress?: CourseProgress;
}) {
  const completed = new Set(progress?.completedLessonIds ?? []);

  return (
    <aside className="rounded-2xl border border-line bg-surface-raised shadow-card lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto">
      <div className="border-b border-line px-5 py-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-600">
          Course Lessons
        </p>
        <Link
          href={`/courses/${course.slug}`}
          className="mt-1 line-clamp-2 text-sm font-bold text-ink hover:text-royal-700 transition-colors"
        >
          {course.title}
        </Link>
      </div>

      <nav className="p-3">
        <ol className="flex flex-col gap-1">
          {course.lessons.map((lesson, index) => {
            const isActive = lesson.id === activeLessonId;
            const isComplete = completed.has(lesson.id) || (progress?.completed ?? false);
            const thumbId = extractYouTubeId(lesson.videoUrl);
            return (
              <li key={lesson.id}>
                <Link
                  href={`/courses/${course.slug}/lessons/${lesson.id}`}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
                    isActive
                      ? "bg-royal-700 text-white shadow-sm"
                      : "text-ink-soft hover:bg-royal-50 hover:text-royal-800",
                  )}
                >
                  <span
                    className={cn(
                      "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold",
                      isComplete
                        ? "bg-gold-500 text-royal-950"
                        : isActive
                          ? "bg-white/20 text-white"
                          : "bg-surface text-faint ring-1 ring-line-strong",
                    )}
                  >
                    {isComplete ? (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    ) : (
                      index + 1
                    )}
                  </span>
                  <span className="flex-1 leading-snug">{lesson.title}</span>
                  {thumbId ? (
                    <span className="hidden shrink-0 text-[10px] text-faint sm:block">
                      {lesson.durationMinutes} min
                    </span>
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ol>
      </nav>
    </aside>
  );
}