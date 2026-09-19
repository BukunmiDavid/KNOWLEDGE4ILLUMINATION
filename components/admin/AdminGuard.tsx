"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/useAuth";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, hydrated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!hydrated) return;
    if (!user) {
      router.replace(`/login?next=${encodeURIComponent(window.location.pathname)}`);
    } else if (user.role !== "admin") {
      router.replace("/courses");
    }
  }, [hydrated, user, router]);

  if (!hydrated || !user || user.role !== "admin") {
    return (
      <main className="flex flex-1 items-center justify-center px-4 py-40">
        <p className="text-sm text-muted">Checking access&hellip;</p>
      </main>
    );
  }

  return <>{children}</>;
}