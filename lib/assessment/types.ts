/**
 * K4I assessment domain types.
 *
 * These interfaces describe what a real K4I assessment backend will
 * eventually return. The current frontend breeds everything through the
 * AssessmentService so the mock implementation can be swapped for the real
 * engine without redesigning the UI.
 */

export type DomainCode = "SEE" | "THINK" | "BUILD" | "GROW" | "LEAD";

export interface Domain {
  code: DomainCode;
  name: string;
  tagline: string;
  description: string;
  /** Order of appearance in the capability framework (SEE=1 … LEAD=5). */
  order: number;
}

/** Question types the renderer must support (the engine may use all of these later). */
export type QuestionType =
  | "likert"
  | "multiple_choice"
  | "single_choice"
  | "situational_judgment"
  | "applied_challenge"
  | "short_response";

export interface AssessmentOption {
  /** Stable option id, e.g. "P01-L1" */
  id: string;
  label: string;
  /** Numeric value for scoreable question types (likert 1–5 etc). */
  value?: number;
}

export interface AssessmentQuestion {
  id: string;
  domain: DomainCode;
  order: number;
  type: QuestionType;
  prompt: string;
  context?: string;
  options: AssessmentOption[];
  /** placeholder / max length for short responses */
  maxLength?: number;
}

export interface Assessment {
  slug: string;
  code: string;
  title: string;
  subtitle: string;
  description: string;
  domains: Domain[];
  questions: AssessmentQuestion[];
  estimatedMinutes: number;
  version: string;
  isMock: boolean;
}

/* ------------------------------------------------------------------ */
/* Participant + session                                              */
/* ------------------------------------------------------------------ */

export type AgeRange =
  | "UNDER_18"
  | "18_24"
  | "25_34"
  | "35_44"
  | "45_54"
  | "55_PLUS"
  | "PREFER_NOT_SAY";

export type CurrentStatus =
  | "STUDENT"
  | "EMPLOYED"
  | "ENTREPRENEUR"
  | "JOB_SEEKER"
  | "PROFESSIONAL"
  | "EDUCATOR"
  | "BUSINESS_OWNER"
  | "OTHER";

export type EducationLevel =
  | "SECONDARY"
  | "DIPLOMA"
  | "BACHELOR"
  | "MASTER"
  | "DOCTORATE"
  | "OTHER";

export type PrimaryGoal =
  | "CAREER_GROWTH"
  | "ENTREPRENEURSHIP"
  | "LEADERSHIP_DEVELOPMENT"
  | "PERSONAL_DEVELOPMENT"
  | "BUSINESS_GROWTH"
  | "EDUCATION"
  | "OTHER";

export interface Participant {
  firstName: string;
  lastName: string;
  email: string;
  countryCode: string;
  phone: string;
  ageRange?: AgeRange | "";
  currentStatus?: CurrentStatus | "";
  educationLevel?: EducationLevel | "";
  country?: string;
  stateRegion?: string;
  primaryGoal?: PrimaryGoal | "";
  /** Consent agreement */
  consent?: boolean;
}

export interface AssessmentSession {
  id: string;
  assessmentSlug: string;
  startedAt: string;
  participant: Participant;
  /** questionId -> response value (or text). */
  responses: Record<string, string | number>;
}

/* ------------------------------------------------------------------ */
/* Results                                                            */
/* ------------------------------------------------------------------ */

export type ScoreLevel = "EMERGING" | "DEVELOPING" | "ESTABLISHED" | "ADVANCING";

export interface DomainResult {
  domain: DomainCode;
  score: number; // 0–100
  level: ScoreLevel;
  summary: string;
}

export interface Strength {
  rank: number;
  title: string;
  detail: string;
  domain: DomainCode;
}

export interface GrowthOpportunity {
  rank: number;
  title: string;
  detail: string;
  domain: DomainCode;
}

export interface AssessmentResult {
  participant: Pick<Participant, "firstName" | "lastName" | "email">;
  assessment: Pick<Assessment, "title" | "subtitle" | "version" | "isMock">;
  completedAt: string;
  overallScore: number;
  summary: string;
  domains: DomainResult[];
  strengths: Strength[];
  growthOpportunities: GrowthOpportunity[];
  /** Fully qualified participant + assessment for future engine payloads. */
  raw?: unknown;
  disclaimer: string;
}

export interface QuestionReview {
  total: number;
  answered: number;
  unanswered: number;
  unansweredQuestions: AssessmentQuestion[];
}