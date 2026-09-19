"use client";

import Link from "next/link";
import { SiteHeader } from "@/components/navigation/SiteHeader";
import { SiteFooter } from "@/components/navigation/SiteFooter";
import { Container } from "@/components/ui/Container";
import { AdminGuard } from "@/components/admin/AdminGuard";
import { CourseEditor } from "@/components/admin/CourseEditor";

export default function NewCoursePage() {
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
              Create course
            </p>
            <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-ink">
              Add a new course
            </h1>
            <p className="mt-2 text-muted">
              Build the course outline and paste YouTube links for each lesson.
            </p>
          </div>
          <div className="mt-8">
            <CourseEditor />
          </div>
        </Container>
      </main>
      <SiteFooter />
    </AdminGuard>
  );
}