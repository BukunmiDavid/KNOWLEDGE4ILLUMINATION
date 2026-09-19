"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { IconArrowRight, IconTrash } from "@/components/ui/icons";
import type { Course } from "@/lib/courses/types";
import { CATEGORY_LABELS, progressPercent } from "@/lib/courses/types";
import { getCourseProgress } from "@/lib/courses/progress-store";
import { extractYouTubeId, buildThumbnailUrl } from "@/lib/courses/youtube";

export function CourseCard({
  course,
  userId,
  isCustom,
  onDelete,
}: {
  course: Course;
  userId?: string;
  isCustom?: boolean;
  onDelete?: (id: string) => void;
}) {
  const [progress, setProgress] = useState<number | null>(null);

  useEffect(() => {
    if (!userId) return;
    (async () => {
      const stored = getCourseProgress(userId, course.slug);
      setProgress(stored ? progressPercent(stored, course.lessons.length) : 0);
    })();
  }, [userId, course.slug, course.lessons.length]);

  const thumb = course.lessons.find((l) => l.videoUrl);
  const thumbId = thumb ? extractYouTubeId(thumb.videoUrl) : null;

  return (
    <Card className="group flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="relative aspect-video overflow-hidden bg-royal-50">
        {thumbId ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={buildThumbnailUrl(thumbId)}
            alt={course.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={course.image}
            alt={course.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        )}
        <span className="absolute left-3 top-3 rounded-full bg-royal-900/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
          {CATEGORY_LABELS[course.category]}
        </span>
        {isCustom ? (
          <span className="absolute right-3 top-3 rounded-full bg-gold-500 px-3 py-1 text-xs font-bold text-royal-950">
            Custom
          </span>
        ) : null}
        {progress !== null && progress > 0 ? (
          <span className="absolute bottom-3 right-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-royal-800 shadow-sm backdrop-blur">
            {progress}%
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="text-lg font-bold leading-snug text-ink">
            {course.title}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm text-muted">{course.description}</p>
        </div>

        <div className="mt-auto flex items-center justify-between text-xs text-faint">
          <span>{course.lessons.length} lessons</span>
          <span className="rounded-full border border-line bg-surface px-2.5 py-0.5 font-medium text-ink-soft">
            {course.level}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Link href={`/courses/${course.slug}`} className="flex-1">
            <Button variant="primary" size="sm" className="w-full">
              {progress !== null && progress > 0 ? "Continue" : "Start Learning"}
              <IconArrowRight />
            </Button>
          </Link>
          {onDelete ? (
            <Button
              variant="ghost"
              size="sm"
              aria-label="Delete course"
              onClick={() => onDelete(course.id)}
            >
              <IconTrash />
            </Button>
          ) : null}
        </div>
      </div>
    </Card>
  );
}