import type { Course, CourseProgress } from "./types";
import { readJSON, writeJSON } from "@/lib/auth/storage";

const PROGRESS_KEY_PREFIX = "k4i:courses:progress:v1";

function keyFor(userId: string): string {
  return `${PROGRESS_KEY_PREFIX}:${userId}`;
}

export function loadProgress(userId: string): CourseProgress[] {
  return readJSON<CourseProgress[]>(keyFor(userId), []);
}

export function getCourseProgress(
  userId: string,
  courseSlug: string,
): CourseProgress | undefined {
  return loadProgress(userId).find((p) => p.courseSlug === courseSlug);
}

export function saveProgress(userId: string, progress: CourseProgress): void {
  const all = loadProgress(userId);
  const rest = all.filter((p) => p.courseSlug !== progress.courseSlug);
  writeJSON(keyFor(userId), [...rest, progress]);
}

export function setLessonComplete(
  userId: string,
  course: Course,
  lessonId: string,
  complete: boolean,
): CourseProgress {
  const current = getCourseProgress(userId, course.slug);
  const completed = new Set(current?.completedLessonIds ?? []);
  if (complete) completed.add(lessonId);
  else completed.delete(lessonId);

  const next: CourseProgress = {
    courseSlug: course.slug,
    completedLessonIds: Array.from(completed),
    lastLessonId: lessonId,
    updatedAt: new Date().toISOString(),
    completed: completed.size > 0 && completed.size >= course.lessons.length,
  };
  saveProgress(userId, next);
  return next;
}

export function resetCourseProgress(userId: string, courseSlug: string): void {
  const all = loadProgress(userId);
  writeJSON(
    keyFor(userId),
    all.filter((p) => p.courseSlug !== courseSlug),
  );
}