import type {
  Assessment,
  AssessmentResult,
  AssessmentSession,
  Participant,
  QuestionReview,
} from "@/lib/assessment/types";
import { LEADERSHIP_ENTREPRENEURSHIP } from "@/lib/assessment/data";
import { scoreSession } from "@/lib/assessment/scorer";
import { buildReportBlob } from "@/lib/assessment/report";
import {
  clearSession,
  createSessionId,
  loadRecentSlug,
  loadResult,
  loadSession,
  saveResult,
  saveSession,
} from "@/lib/assessment/session-store";

export interface AssessmentApi {
  getAssessment(slug: string): Promise<Assessment>;
  startAssessment(slug: string, participant: Participant): Promise<AssessmentSession>;
  getSession(): Promise<AssessmentSession | null>;
  saveResponse(questionId: string, value: string | number): Promise<void>;
  getProgress(session: AssessmentSession): { answered: number; total: number };
  review(session: AssessmentSession, assessment: Assessment): QuestionReview;
  submitAssessment(session: AssessmentSession): Promise<AssessmentResult>;
  getResult(): Promise<AssessmentResult | null>;
  generateReport(result: AssessmentResult): { blob: Blob; filename: string };
  reset(): void;
}

const assessments: Record<string, Assessment> = {
  [LEADERSHIP_ENTREPRENEURSHIP.slug]: LEADERSHIP_ENTREPRENEURSHIP,
};

export const assessmentCatalog = Object.values(assessments);

export const MockAssessmentService: AssessmentApi = {
  async getAssessment(slug: string): Promise<Assessment> {
    const assessment = assessments[slug];
    if (!assessment) throw new Error(`Assessment "${slug}" not found.`);
    return assessment;
  },

  async startAssessment(slug: string, participant: Participant): Promise<AssessmentSession> {
    const assessment = await this.getAssessment(slug);
    const session: AssessmentSession = {
      id: createSessionId(),
      assessmentSlug: assessment.slug,
      startedAt: new Date().toISOString(),
      participant,
      responses: {},
    };
    saveSession(session);
    return session;
  },

  async getSession(): Promise<AssessmentSession | null> {
    return loadSession();
  },

  async saveResponse(questionId: string, value: string | number): Promise<void> {
    const session = loadSession();
    if (!session) return;
    session.responses[questionId] = value;
    saveSession(session);
  },

  getProgress(session: AssessmentSession) {
    const assessment = assessments[session.assessmentSlug];
    const total = assessment?.questions.length ?? 0;
    const answered = Object.values(session.responses).filter(
      (v) => v !== undefined && v !== null && v !== "",
    ).length;
    return { answered, total };
  },

  review(session: AssessmentSession, assessment: Assessment): QuestionReview {
    const answeredIds = new Set(
      Object.entries(session.responses)
        .filter(([, v]) => v !== undefined && v !== null && v !== "")
        .map(([id]) => id),
    );
    const unansweredQuestions = assessment.questions.filter((q) => !answeredIds.has(q.id));
    return {
      total: assessment.questions.length,
      answered: assessment.questions.length - unansweredQuestions.length,
      unanswered: unansweredQuestions.length,
      unansweredQuestions,
    };
  },

  async submitAssessment(session: AssessmentSession): Promise<AssessmentResult> {
    const assessment = assessments[session.assessmentSlug];
    if (!assessment) throw new Error(`Cannot submit: "${session.assessmentSlug}" not found.`);
    const result = scoreSession({ assessment, session });
    saveResult(result);
    return result;
  },

  async getResult(): Promise<AssessmentResult | null> {
    return loadResult();
  },

  generateReport(result: AssessmentResult) {
    const name = `${result.participant.firstName} ${result.participant.lastName}`
      .trim()
      .replace(/\s+/g, "-")
      .toLowerCase();
    const filename = `k4i-leadership-entrepreneurship-${name || "report"}`;
    return buildReportBlob(LEADERSHIP_ENTREPRENEURSHIP, result, filename);
  },

  reset() {
    clearSession();
  },
};

export { loadRecentSlug };