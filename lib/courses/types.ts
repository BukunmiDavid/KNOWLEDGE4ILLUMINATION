export type Category = "web-development" | "python" | "design" | "ai" | "digital-literacy";

export interface Lesson {
  id: string;
  title: string;
  description?: string;
  videoUrl?: string;
  durationMinutes?: number;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  category: Category;
  description: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  image: string;
  lessons: Lesson[];
  createdAt: string;
  isCustom?: boolean;
}

export interface CourseProgress {
  courseSlug: string;
  completedLessonIds: string[];
  lastLessonId?: string;
  updatedAt: string;
  completed: boolean;
}

export const CATEGORY_LABELS: Record<Category, string> = {
  "web-development": "Web Development",
  python: "Python",
  design: "Digital Design",
  ai: "Artificial Intelligence",
  "digital-literacy": "Digital Literacy",
};

export function courseDurationMinutes(course: Course): number {
  return course.lessons.reduce((sum, lesson) => sum + (lesson.durationMinutes ?? 0), 0);
}

export function progressPercent(progress: CourseProgress | undefined, lessonCount: number): number {
  if (!progress || lessonCount === 0) return 0;
  return Math.round((progress.completedLessonIds.length / lessonCount) * 100);
}