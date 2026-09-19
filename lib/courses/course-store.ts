import type { Course } from "./types";
import { seedCourses } from "./data";
import { readJSON, writeJSON } from "@/lib/auth/storage";

const CUSTOM_COURSES_KEY = "k4i:courses:custom:v1";

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function loadCustomCourses(): Course[] {
  return readJSON<Course[]>(CUSTOM_COURSES_KEY, []);
}

export function saveCustomCourse(course: Course): void {
  const courses = loadCustomCourses();
  const rest = courses.filter((c) => c.id !== course.id);
  writeJSON(CUSTOM_COURSES_KEY, [course, ...rest]);
}

export function deleteCustomCourse(courseId: string): void {
  const courses = loadCustomCourses().filter((c) => c.id !== courseId);
  writeJSON(CUSTOM_COURSES_KEY, courses);
}

export function getAllCourses(): Course[] {
  return [...loadCustomCourses(), ...seedCourses];
}

export function getCourseBySlug(slug: string): Course | undefined {
  return getAllCourses().find((c) => c.slug === slug);
}

export function getCoursesByCategory(category: Course["category"]): Course[] {
  return getAllCourses().filter((c) => c.category === category);
}