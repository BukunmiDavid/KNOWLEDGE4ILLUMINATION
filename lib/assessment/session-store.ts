import type { AssessmentResult, AssessmentSession } from "@/lib/assessment/types";

/**
 * Temporary local persistence layer for the frontend-first build.
 * Survives full-page refreshes so a user never loses progress mid-assessment.
 * Swap this for the real backend later without touching the UI.
 */

const SESSION_KEY = "k4i:assessment:session:v1";
const RESULT_KEY = "k4i:assessment:result:v1";
const SLUG_KEY = "k4i:assessment:slug:v1";

function canUseStorage(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function read<T>(key: string): T | null {
  if (!canUseStorage()) return null;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function write(key: string, value: unknown): void {
  if (!canUseStorage()) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage full or blocked — non-fatal for the mock build */
  }
}

export function createSessionId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `k4i-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export function saveSession(session: AssessmentSession): void {
  write(SESSION_KEY, session);
  write(SLUG_KEY, session.assessmentSlug);
}

export function loadSession(): AssessmentSession | null {
  return read<AssessmentSession>(SESSION_KEY);
}

export function clearSession(): void {
  if (!canUseStorage()) return;
  try {
    window.localStorage.removeItem(SESSION_KEY);
    window.localStorage.removeItem(SLUG_KEY);
    window.localStorage.removeItem(RESULT_KEY);
  } catch {
    /* ignore */
  }
}

export function saveResult(result: AssessmentResult): void {
  write(RESULT_KEY, result);
}

export function loadResult(): AssessmentResult | null {
  return read<AssessmentResult>(RESULT_KEY);
}

export function loadRecentSlug(): string | null {
  return read<string>(SLUG_KEY);
}