"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { YouTubeEmbed } from "@/components/courses/YouTubeEmbed";
import { saveCustomCourse } from "@/lib/courses/course-store";
import { slugify } from "@/lib/courses/course-store";
import type { Course, Category, Lesson } from "@/lib/courses/types";
import { CATEGORY_LABELS } from "@/lib/courses/types";
import { extractYouTubeId } from "@/lib/courses/youtube";

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=1200&q=80";

interface Draft {
  title: string;
  category: Category;
  level: Course["level"];
  description: string;
  image: string;
  lessons: Lesson[];
}

function emptyLesson(): Lesson {
  return { id: "", title: "", description: "", videoUrl: "", durationMinutes: 15 };
}

export function CourseEditor({ course }: { course?: Course }) {
  const isEdit = Boolean(course);
  const router = useRouter();

  const [draft, setDraft] = useState<Draft>(() => ({
    title: course?.title ?? "",
    category: course?.category ?? "web-development",
    level: course?.level ?? "Beginner",
    description: course?.description ?? "",
    image: course?.image ?? DEFAULT_IMAGE,
    lessons: course?.lessons.length
      ? course.lessons
      : [emptyLesson()],
  }));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  const setLesson = (index: number, patch: Partial<Lesson>) => {
    setDraft((d) => ({
      ...d,
      lessons: d.lessons.map((l, i) => (i === index ? { ...l, ...patch } : l)),
    }));
  };

  const update = (patch: Partial<Draft>) => setDraft((d) => ({ ...d, ...patch }));

  const addLesson = () =>
    setDraft((d) => ({ ...d, lessons: [...d.lessons, emptyLesson()] }));
  const removeLesson = (index: number) =>
    setDraft((d) => ({
      ...d,
      lessons: d.lessons.filter((_, i) => i !== index),
    }));

  const validate = (): boolean => {
    const next: Record<string, string> = {};
    if (!draft.title.trim()) next.title = "Please enter a course title.";
    if (!draft.description.trim())
      next.description = "Please add a short description.";
    draft.lessons.forEach((lesson, i) => {
      const slug = `lesson-${i}`;
      if (!lesson.title.trim()) next[slug] = "Lesson title is required.";
      else if (!extractYouTubeId(lesson.videoUrl))
        next[slug] = "Paste a valid YouTube link (watch, embed or youtu.be).";
      if (!lesson.id) lesson.id = slugify(lesson.title) || `lesson-${i + 1}`;
    });
    if (draft.lessons.every((l) => !l.title.trim()))
      next.lessons = "Add at least one lesson with a title and YouTube link.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);

    const base = course ?? {
      id: `course-${Date.now()}`,
      slug: slugify(draft.title),
      createdAt: new Date().toISOString().slice(0, 10),
      isCustom: true,
    };

    const ready: Course = {
      ...base,
      title: draft.title.trim(),
      category: draft.category,
      level: draft.level,
      description: draft.description.trim(),
      image: draft.image.trim() || DEFAULT_IMAGE,
      lessons: draft.lessons
        .filter((l) => l.title.trim())
        .map((l) => ({
          ...l,
          id: l.id || slugify(l.title),
          title: l.title.trim(),
          description: l.description?.trim() || undefined,
        })),
    };

    saveCustomCourse(ready);
    router.push(`/courses/${ready.slug}`);
    router.refresh();
  };

  return (
    <form onSubmit={onSubmit} className="flex w-full flex-col gap-8">
      <p className="rounded-xl border border-gold-200 bg-gold-50 px-4 py-3 text-sm text-royal-900">
        <strong>Tip:</strong> paste any YouTube link ({" "}
        <code className="text-xs">youtube.com/watch?v=…</code>,{" "}
        <code className="text-xs">youtu.be/…</code> or{" "}
        <code className="text-xs">youtube.com/embed/…</code>) — the video will play
        right inside the lesson, no redirect.
      </p>

      <div className="rounded-2xl border border-line bg-surface-raised p-6 shadow-card">
        <h2 className="text-lg font-bold text-ink">Course details</h2>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Input
              label="Course title"
              name="title"
              placeholder="e.g. Introduction to Robotics"
              value={draft.title}
              onChange={(e) => update({ title: e.target.value })}
              error={errors.title}
            />
          </div>
          <Select
            label="Category"
            name="category"
            value={draft.category}
            onChange={(e) => update({ category: e.target.value as Category })}
            options={Object.entries(CATEGORY_LABELS).map(([value, label]) => ({
              value,
              label,
            }))}
          />
          <Select
            label="Level"
            name="level"
            value={draft.level}
            onChange={(e) => update({ level: e.target.value as Course["level"] })}
            options={["Beginner", "Intermediate", "Advanced"].map((v) => ({
              value: v,
              label: v,
            }))}
          />
          <div className="sm:col-span-2">
            <Input
              label="Short description"
              name="description"
              placeholder="What will learners be able to do after this course?"
              value={draft.description}
              onChange={(e) => update({ description: e.target.value })}
              error={errors.description}
            />
          </div>
          <div className="sm:col-span-2">
            <Input
              label="Cover image URL (optional)"
              name="image"
              placeholder="https://…"
              value={draft.image}
              onChange={(e) => update({ image: e.target.value })}
              hint="A nice image makes your course stand out on the catalog."
            />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-line bg-surface-raised p-6 shadow-card">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-ink">Lessons &amp; videos</h2>
            <p className="text-sm text-muted">
              Each lesson gets one YouTube video that plays inline.
            </p>
          </div>
          <Button type="button" variant="secondary" size="sm" onClick={addLesson}>
            + Add lesson
          </Button>
        </div>

        {errors.lessons ? (
          <p role="alert" className="mt-3 text-sm font-semibold text-red-600">
            {errors.lessons}
          </p>
        ) : null}

        <div className="mt-6 flex flex-col gap-6">
          {draft.lessons.map((lesson, index) => {
            const videoId = extractYouTubeId(lesson.videoUrl);
            return (
              <div
                key={index}
                className="rounded-2xl border border-line bg-white p-5"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-faint">
                    Lesson {index + 1}
                  </p>
                  {draft.lessons.length > 1 ? (
                    <button
                      type="button"
                      onClick={() => removeLesson(index)}
                      className="text-xs font-semibold text-faint transition-colors hover:text-red-600"
                    >
                      Remove
                    </button>
                  ) : null}
                </div>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Input
                    label="Lesson title"
                    name={`lesson-title-${index}`}
                    placeholder="e.g. What is a microcontroller?"
                    value={lesson.title}
                    onChange={(e) => setLesson(index, { title: e.target.value })}
                    error={errors[`lesson-${index}`]}
                  />
                  <Input
                    label="YouTube link"
                    name={`lesson-video-${index}`}
                    placeholder="https://www.youtube.com/watch?v=…"
                    value={lesson.videoUrl ?? ""}
                    onChange={(e) => setLesson(index, { videoUrl: e.target.value })}
                    error={errors[`lesson-${index}`]}
                  />
                  <div className="sm:col-span-2">
                    <Input
                      label="Description (optional)"
                      name={`lesson-desc-${index}`}
                      placeholder="A sentence about what this lesson covers."
                      value={lesson.description ?? ""}
                      onChange={(e) => setLesson(index, { description: e.target.value })}
                    />
                  </div>
                </div>
                {videoId ? (
                  <div className="mt-4">
                    <p className="mb-2 text-xs font-semibold text-faint">
                      Preview — plays inline
                    </p>
                    <YouTubeEmbed url={lesson.videoUrl ?? ""} title={lesson.title || "Preview"} />
                    <p className="mt-2 break-all text-xs text-faint">
                      Detected video id: <code>{videoId}</code>
                    </p>
                  </div>
                ) : lesson.videoUrl ? (
                  <p className="mt-3 text-xs font-semibold text-red-500">
                    That doesn&apos;t look like a valid YouTube link yet.
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-end gap-3">
        <Button type="button" variant="ghost" size="md" asChild>
          <Link href="/admin">Cancel</Link>
        </Button>
        <Button type="submit" variant="primary" size="lg" disabled={saving}>
          {saving ? "Saving…" : isEdit ? "Save changes" : "Create course"}
        </Button>
      </div>
    </form>
  );
}