"use client";

import Link from "next/link";
import { SiteHeader } from "@/components/navigation/SiteHeader";
import { SiteFooter } from "@/components/navigation/SiteFooter";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { AuthForm } from "@/components/auth/AuthForm";
import { useAuth } from "@/lib/auth/useAuth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  const { user, hydrated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (hydrated && user) router.replace("/courses");
  }, [hydrated, user, router]);

  if (hydrated && user) {
    return (
      <>
        <SiteHeader />
        <main className="flex flex-1 items-center justify-center px-4 py-32">
          <div className="text-center">
            <p className="text-sm text-muted">You are already signed in.</p>
            <Button variant="primary" className="mt-4" asChild>
              <Link href="/courses">Go to courses</Link>
            </Button>
          </div>
        </main>
        <SiteFooter />
      </>
    );
  }

  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 items-center justify-center px-4 py-28">
        <Container>
          <div className="mx-auto w-full max-w-md">
            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-600">
                Welcome back
              </p>
              <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
                Sign in to your account
              </h1>
              <p className="mt-3 text-muted">
                Pick up right where you left off and keep your progress.
              </p>
            </div>
            <Card className="mt-8 p-6 sm:p-8">
              <AuthForm mode="login" />
            </Card>
          </div>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}