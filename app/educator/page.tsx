"use client";

import { useState } from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/navigation/SiteHeader";
import { SiteFooter } from "@/components/navigation/SiteFooter";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import {
  IconArrowRight,
  IconCheck,
  IconShield,
} from "@/components/ui/icons";
import { useAuth } from "@/lib/auth/useAuth";
import {
  submitAccessRequest,
  buildRequestMailto,
  SUPPORT_EMAIL,
} from "@/lib/auth/access-requests";

const steps = [
  {
    title: "Send your request",
    description: "Tell us who you are and what courses you'd like to publish.",
  },
  {
    title: "We review it",
    description: "Our team checks your request within a few days.",
  },
  {
    title: "Get educator access",
    description: "Once approved you can publish courses and video lessons.",
  },
];

export default function EducatorPage() {
  const { user, hydrated } = useAuth();
  const [organization, setOrganization] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const name = user?.name ?? "";
  const email = user?.email ?? "";

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!user) next.email = "You must be signed in to request access.";
    if (message.trim().length < 20)
      next.message =
        "Please describe your courses in at least 20 characters.";
    setErrors(next);
    if (Object.keys(next).length > 0 || !user) return;

    const request = submitAccessRequest({
      name: user.name,
      email: user.email,
      organization,
      message,
    });
    window.location.href = buildRequestMailto(request);
    setSubmitted(true);
  };

  return (
    <>
      <SiteHeader />
      <main className="flex-1 pt-28 pb-20">
        <Container className="max-w-4xl">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-600">
              For educators
            </p>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Publish your courses on Knowledge4Illumination
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-muted">
              We want to make sure learners only see trusted, high-quality
              content. Request access, our team approves you, and then you can
              add your own courses and video lessons.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {steps.map((step, i) => (
              <Card key={step.title} className="p-5">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-royal-700 text-sm font-bold text-white">
                  {i + 1}
                </span>
                <h3 className="mt-3 font-bold text-ink">{step.title}</h3>
                <p className="mt-1 text-sm text-muted">{step.description}</p>
              </Card>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="rounded-2xl border border-line bg-surface p-6">
              <h2 className="text-lg font-bold text-ink">
                What you can do after approval
              </h2>
              <ul className="mt-4 flex flex-col gap-3 text-sm text-muted">
                <li className="flex items-center gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-100 text-gold-700">
                    <IconCheck className="h-3 w-3" />
                  </span>
                  Create unlimited courses for any tech topic
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-100 text-gold-700">
                    <IconCheck className="h-3 w-3" />
                  </span>
                  Add YouTube video lessons that play right on the page
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-100 text-gold-700">
                    <IconCheck className="h-3 w-3" />
                  </span>
                  Edit and manage your courses any time
                </li>
              </ul>
            </div>

            <Card className="p-6 sm:p-8">
              {!hydrated ? (
                <div className="flex flex-col items-center gap-3 py-10 text-center">
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-royal-200 border-t-royal-700" />
                  <p className="text-sm text-muted">Checking your account&hellip;</p>
                </div>
              ) : !user ? (
                <div className="flex flex-col items-center gap-4 py-6 text-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-royal-100 text-royal-700">
                    <IconShield />
                  </span>
                  <div>
                    <p className="font-bold text-ink">Sign in to request access</p>
                    <p className="mt-1 text-sm text-muted">
                      Requests are linked to your account so we can approve you
                      directly.
                    </p>
                  </div>
                  <div className="flex flex-wrap justify-center gap-3">
                    <Button variant="primary" size="md" asChild>
                      <Link href="/login">Sign in</Link>
                    </Button>
                    <Button variant="secondary" size="md" asChild>
                      <Link href="/register">Create an account</Link>
                    </Button>
                  </div>
                </div>
              ) : submitted ? (
                <div className="flex flex-col items-center gap-4 py-6 text-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold-500 text-royal-950">
                    <IconCheck className="h-8 w-8" />
                  </span>
                  <div>
                    <p className="text-lg font-bold text-ink">Request sent!</p>
                    <p className="mx-auto mt-1 max-w-sm text-sm text-muted">
                      Your email app should have opened so you can send your
                      request to {SUPPORT_EMAIL}. We&apos;ll review it and get
                      back to you soon.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="flex flex-col gap-5">
                  <h2 className="text-lg font-bold text-ink">
                    Request educator access
                  </h2>
                  <Input label="Full name" value={name} readOnly />
                  <Input label="Email" value={email} readOnly />
                  <Input
                    label="School / organization (optional)"
                    placeholder="e.g. Bright Future Academy"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                  />
                  <Textarea
                    label="Tell us about your courses"
                    placeholder="What topics will you teach? Who are the lessons for?"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    error={errors.message}
                  />
                  {errors.email ? (
                    <p role="alert" className="text-sm font-semibold text-red-600">
                      {errors.email}
                    </p>
                  ) : null}
                  <Button variant="primary" size="lg" type="submit">
                    Send request
                    <IconArrowRight />
                  </Button>
                </form>
              )}
            </Card>
          </div>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
