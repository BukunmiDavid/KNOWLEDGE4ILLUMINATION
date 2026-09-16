"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SiteHeader } from "@/components/navigation/SiteHeader";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SiteFooter } from "@/components/navigation/SiteFooter";
import { MockAssessmentService } from "@/lib/assessment/service";
import type { Assessment, AssessmentSession, QuestionReview } from "@/lib/assessment/types";

export default function ReviewPage() {
  const router = useRouter();
  const [session, setSession] = useState<AssessmentSession | null>(null);
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [review, setReview] = useState<QuestionReview | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    (async () => {
      const s = await MockAssessmentService.getSession();
      if (!s) { router.replace("/assessments/leadership-entrepreneurship/details"); return; }
      const a = await MockAssessmentService.getAssessment(s.assessmentSlug);
      const r = MockAssessmentService.review(s, a);
      setSession(s);
      setAssessment(a);
      setReview(r);
    })();
  }, [router]);

  async function handleSubmit() {
    if (!session) return;
    setSubmitting(true);
    try {
      await MockAssessmentService.submitAssessment(session);
      router.push("/assessments/leadership-entrepreneurship/processing");
    } catch {
      setSubmitting(false);
    }
  }

  if (!review || !assessment) {
    return <div className="flex min-h-screen items-center justify-center"><p className="text-muted">Loading...</p></div>;
  }

  return (
    <>
      <SiteHeader />
      <main className="flex-1 pt-28 pb-20">
        <Container className="max-w-2xl">
          <h1 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">You&apos;re almost done.</h1>

          <Card className="mt-8 p-8">
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-3xl font-extrabold text-royal-700">{review.answered}</p>
                <p className="text-sm text-muted">Answered</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-gold-600">{review.unanswered}</p>
                <p className="text-sm text-muted">Unanswered</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-ink">{review.total}</p>
                <p className="text-sm text-muted">Total</p>
              </div>
            </div>

            {review.unanswered > 0 && (
              <div className="mt-6 rounded-xl bg-gold-50 border border-gold-200 p-4">
                <p className="text-sm font-semibold text-gold-800">
                  You have {review.unanswered} unanswered question{review.unanswered > 1 ? "s" : ""}.
                </p>
                <p className="mt-1 text-xs text-gold-700">
                  You can still submit, but your results will be based only on answered questions.
                </p>
              </div>
            )}
          </Card>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Button variant="secondary" onClick={() => router.push("/assessments/leadership-entrepreneurship/questions")}>
              Continue Answering
            </Button>
            <Button variant="primary" onClick={handleSubmit} disabled={submitting}>
              {submitting ? "Submitting..." : "Submit Assessment"}
            </Button>
          </div>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}