"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { SiteHeader } from "@/components/navigation/SiteHeader";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { MockAssessmentService } from "@/lib/assessment/service";
import type { Assessment, AssessmentSession } from "@/lib/assessment/types";

export default function QuestionsPage() {
  const router = useRouter();
  const [session, setSession] = useState<AssessmentSession | null>(null);
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      const s = await MockAssessmentService.getSession();
      if (!s) { router.replace("/assessments/leadership-entrepreneurship/details"); return; }
      const a = await MockAssessmentService.getAssessment(s.assessmentSlug);
      setSession(s);
      setAssessment(a);
      setReady(true);
    })();
  }, [router]);

  const saveResponse = useCallback(async (questionId: string, value: string | number) => {
    await MockAssessmentService.saveResponse(questionId, value);
    setSession((prev) => prev ? { ...prev, responses: { ...prev.responses, [questionId]: value } } : prev);
  }, []);

  if (!ready || !session || !assessment) {
    return <div className="flex min-h-screen items-center justify-center"><p className="text-muted">Loading...</p></div>;
  }

  const question = assessment.questions[currentIdx];
  const total = assessment.questions.length;
  const answered = Object.values(session.responses).filter((v) => v !== undefined && v !== null && v !== "").length;
  const progress = Math.round((answered / total) * 100);
  const currentValue = session.responses[question.id];

  function advance() {
    if (currentIdx < total - 1) {
      setCurrentIdx((i) => i + 1);
    } else {
      router.push("/assessments/leadership-entrepreneurship/review");
    }
  }

  function handleSelect(questionId: string, value: string | number) {
    void saveResponse(questionId, value);
    window.setTimeout(advance, 250);
  }

  return (
    <>
      <SiteHeader />
      <main className="flex min-h-screen flex-col pt-20">
        <Container className="mx-auto flex w-full max-w-2xl flex-1 flex-col py-6">
          {/* Progress */}
          <div className="mb-6">
            <div className="h-2 w-full overflow-hidden rounded-full bg-surface">
              <div
                className="h-full rounded-full bg-gradient-to-r from-royal-600 to-royal-700 transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
                role="progressbar"
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
            {/* Domain dots */}
            <div className="mt-3 flex items-center gap-3 text-xs">
              {assessment.domains.map((d) => {
                const questionsInDomain = assessment.questions.filter((q) => q.domain === d.code);
                const answeredInDomain = questionsInDomain.filter((q) => session.responses[q.id] !== undefined && session.responses[q.id] !== null && session.responses[q.id] !== "").length;
                const isCurrent = question.domain === d.code;
                return (
                  <span key={d.code} className={`font-semibold ${isCurrent ? "text-royal-700" : answeredInDomain === questionsInDomain.length ? "text-gold-600" : "text-faint"}`}>
                    {d.code}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Question card */}
          <Card className="flex flex-1 flex-col p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="rounded-lg bg-royal-50 px-2.5 py-1 text-xs font-bold text-royal-700">{question.domain}</span>
              <span className="text-xs text-faint capitalize">{question.type.replace("_", " ")}</span>
            </div>

            {question.context && (
              <p className="mb-3 text-xs italic text-muted">{question.context}</p>
            )}

            <h2 className="text-lg font-bold text-ink leading-relaxed">{question.prompt}</h2>

            {/* Answer options */}
            <div className="mt-6 space-y-3">
              {question.type === "short_response" ? (
                <textarea
                  className="w-full rounded-xl border border-line-strong bg-white p-4 text-sm text-ink placeholder:text-faint focus:border-royal-500 focus:outline-none focus:ring-2 focus:ring-royal-100"
                  rows={4}
                  maxLength={question.maxLength ?? 280}
                  placeholder="Type your response..."
                  value={(currentValue as string) ?? ""}
                  onChange={(e) => saveResponse(question.id, e.target.value)}
                />
              ) : (
                question.options.map((option) => {
                  const isSelected = currentValue === option.value;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => handleSelect(question.id, option.value!)}
                      className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3.5 text-left text-sm transition-all ${
                        isSelected
                          ? "border-royal-400 bg-royal-50 text-royal-800 shadow-sm"
                          : "border-line text-ink hover:border-royal-200 hover:bg-surface"
                      }`}
                    >
                      <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${isSelected ? "border-royal-600" : "border-faint"}`}>
                        {isSelected && <span className="h-2 w-2 rounded-full bg-royal-600" />}
                      </span>
                      {option.label}
                    </button>
                  );
                })
              )}
            </div>
          </Card>

          {/* Navigation */}
          <div className="mt-6 flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => setCurrentIdx((i) => Math.max(0, i - 1))}
              disabled={currentIdx === 0}
            >
              Previous
            </Button>
            {question.type === "short_response" ? (
              <Button variant="primary" onClick={advance}>
                {currentIdx === total - 1 ? "Review" : "Next"}
              </Button>
            ) : null}
          </div>
        </Container>
      </main>
    </>
  );
}