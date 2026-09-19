"use client";

import Link from "next/link";
import { useMemo } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { IconArrowLeft, IconArrowRight, IconCheck } from "@/components/ui/icons";
import { YouTubeEmbed } from "@/components/courses/YouTubeEmbed";
import { ProgressBar } from "@/components/courses/ProgressBar";
import type { Course, CourseProgress, Lesson } from "@/lib/courses/types";
import { progressPercent } from "@/lib/courses/types";
import { setLessonComplete } from "@/lib/courses/progress-store";
import { cn } from "@/lib/utils";

export function LessonPlayer({
  course,
  lesson,
  progress,
  userId,
  onProgressChange,
}: {
  course: Course;
  lesson: Lesson;
  progress?: CourseProgress;
  userId?: string;
  onProgressChange?: (progress: CourseProgress) => void;
}) {
  const isComplete = progress?.completedLessonIds.includes(lesson.id) ?? false;
  const percent = userId ? progressPercent(progress, course.lessons.length) : 0;

  const index = useMemo(
    () => course.lessons.findIndex((l) => l.id === lesson.id),
    [course.lessons, lesson.id],
  );
  const prev = index > 0 ? course.lessons[index - 1] : null;
  const next = index < course.lessons.length - 1 ? course.lessons[index + 1] : null;

  const toggleComplete = () => {
    if (!userId) return;
    const updated = setLessonComplete(userId, course, lesson.id, !isComplete);
    onProgressChange?.(updated);
  };

  const isFinalLesson = index === course.lessons.length - 1;

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Link
          href={`/courses/${course.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-royal-700 transition-colors hover:text-royal-800"
        >
          <IconArrowLeft className="h-3.5 w-3.5" />
          Back to course
        </Link>
        <h1 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
          {lesson.title}
        </h1>
        {lesson.description ? (
          <p className="text-sm leading-relaxed text-muted">{lesson.description}</p>
        ) : null}
      </div>

      <div className="w-full">
        <YouTubeEmbed url={lesson.videoUrl ?? ""} title={lesson.title} />
      </div>

      {userId ? (
        <Card className="p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={toggleComplete}
                role="checkbox"
                aria-checked={isComplete}
                className={cn(
                  "flex items-center gap-3 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all",
                  isComplete
                    ? "border-gold-500 bg-gold-50 text-royal-900"
                    : "border-line-strong bg-white text-ink-soft hover:border-royal-400 hover:text-royal-800",
                )}
              >
                <span
                  className={cn(
                    "flex h-5 w-5 items-center justify-center rounded-md border-2 transition-colors",
                    isComplete ? "border-gold-500 bg-gold-500 text-royal-950" : "border-faint",
                  )}
                >
                  {isComplete ? (
                    <IconCheck className="h-3 w-3" />
                  ) : null}
                </span>
                {isComplete ? "Lesson completed" : "Mark as complete"}
              </button>
              {percent > 0 ? (
                <div className="flex min-w-[8rem] flex-col gap-1">
                  <span className="text-xs font-semibold text-faint">
                    Course progress: {percent}%
                  </span>
                  <ProgressBar percent={percent} className="max-w-[12rem]" />
                </div>
              ) : null}
            </div>
          </div>
        </Card>
      ) : (
        <div className="flex items-center justify-between rounded-2xl border border-line bg-surface px-5 py-4">
          <p className="text-sm text-muted">
            Sign in to save your progress and unlock course completion.
          </p>
          <Button variant="secondary" size="sm" asChild>
            <Link href="/login">Sign in</Link>
          </Button>
        </div>
      )}

      <div className="flex items-center justify-between gap-3">
        {prev ? (
          <Button variant="secondary" size="md" asChild>
            <Link
              href={`/courses/${course.slug}/lessons/${prev.id}`}
              className="inline-flex"
            >
              <IconArrowLeft />
              Previous
            </Link>
          </Button>
        ) : (
          <span />
        )}

        {next ? (
          <Button variant="primary" size="md" asChild>
            <Link href={`/courses/${course.slug}/lessons/${next.id}`}>
              Next Lesson
              <IconArrowRight />
            </Link>
          </Button>
        ) : isFinalLesson ? (
          <Link href={`/courses/${course.slug}`}>
            <Button variant="gold" size="md">
              Finish Course
              <IconCheck />
            </Button>
          </Link>
        ) : null}
      </div>
    </div>
  );
}