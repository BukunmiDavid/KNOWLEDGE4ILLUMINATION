import type {
  Assessment,
  AssessmentResult,
  AssessmentSession,
  DomainCode,
  DomainResult,
  GrowthOpportunity,
  Participant,
  ScoreLevel,
  Strength,
} from "@/lib/assessment/types";

/**
 * DEMO scoring — replaced by the deterministic K4I scoring engine later.
 *
 * This is a clean, deterministic mock (same answers in → same results out)
 * so the UI can be built and tested exactly as it will behave with the real
 * engine. It is deliberately NOT the validated K4I scoring system.
 */

export const RESULT_DISCLAIMER =
  "This assessment provides developmental insights based on your responses. It is not a clinical, psychological, employment, or professional certification assessment.";

const LEVEL_INFO: Array<{ min: number; level: ScoreLevel }> = [
  { min: 75, level: "ADVANCING" },
  { min: 60, level: "ESTABLISHED" },
  { min: 40, level: "DEVELOPING" },
  { min: 0, level: "EMERGING" },
];

export function levelFor(score: number): ScoreLevel {
  for (const entry of LEVEL_INFO) {
    if (score >= entry.min) return entry.level;
  }
  return "EMERGING";
}

function normalize(value: number, optionCount: number): number {
  if (optionCount <= 1) return 100;
  return ((value - 1) / (optionCount - 1)) * 100;
}

const STRENGTH_TITLES: Record<DomainCode, string> = {
  SEE: "Opportunity Recognition",
  THINK: "Strategic Reasoning",
  BUILD: "Execution",
  GROW: "Value Creation",
  LEAD: "Leadership",
};

const GROWTH_TITLES: Record<DomainCode, string> = {
  SEE: "Customer Discovery",
  THINK: "Evidence-Based Decision Making",
  BUILD: "Iterative Validation",
  GROW: "Financial & Business Thinking",
  LEAD: "Influencing & Persuasion",
};

const SUMMARY_TEMPLATES: Record<
  DomainCode,
  (strengthTitle: string, growthTitle: string) => string
> = {
  SEE: (s, g) => `Your results suggest strong ${s}, with an opportunity to strengthen ${g} and sharpen how you validate what you observe.`,
  THINK: (s, g) => `Your results suggest strong ${s}, with an opportunity to build more ${g} into the way you conclude and act.`,
  BUILD: (s, g) => `Your results suggest strong ${s} tendencies, with an opportunity to deepen ${g} so ideas survive contact with the real world.`,
  GROW: (s, g) => `Your results suggest a meaningful focus on ${s}, with an opportunity to grow ${g} and build what lasts.`,
  LEAD: (s, g) => `Your results suggest strong ${s}, with an opportunity to sharpen ${g} so your vision travels further with others.`,
};

const REQUIRED_STRENGTH_COUNT = 3;

export interface ScorerInput {
  assessment: Assessment;
  session: Pick<AssessmentSession, "responses" | "participant">;
}

export function scoreSession(input: ScorerInput): AssessmentResult {
  const { assessment, session } = input;

  const perDomain: Record<DomainCode, number[]> = {
    SEE: [],
    THINK: [],
    BUILD: [],
    GROW: [],
    LEAD: [],
  };
  let _ungraded = 0;

  for (const q of assessment.questions) {
    const raw = session.responses[q.id];
    if (raw === undefined || raw === null || raw === "") {
      _ungraded += 1;
      continue;
    }
    if (typeof raw === "string" || !q.options.length) {
      _ungraded += 1;
      continue;
    }
    const value = raw as number;
    const option = q.options.find((o) => o.value === value);
    if (!option || typeof option.value !== "number") {
      _ungraded += 1;
      continue;
    }
    perDomain[q.domain].push(normalize(value, q.options.length));
  }

  const domains: DomainResult[] = assessment.domains.map((domain) => {
    const scores = perDomain[domain.code];
    const score = scores.length
      ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
      : 40;
    return {
      domain: domain.code,
      score,
      level: levelFor(score),
      summary: domain.tagline,
    };
  });

  const byScoreDesc = [...domains].sort((a, b) => b.score - a.score);
  const strongest = byScoreDesc[0];
  const weakest = byScoreDesc[byScoreDesc.length - 1];

  const strengths: Strength[] = byScoreDesc
    .slice(0, REQUIRED_STRENGTH_COUNT)
    .map((domain, index) => ({
      rank: index + 1,
      domain: domain.domain,
      title: STRENGTH_TITLES[domain.domain],
      detail: strengthDetail(domain.domain, domain.score),
    }));

  const growthDomains = [...domains]
    .sort((a, b) => a.score - b.score)
    .slice(0, 2);
  const growthOpportunities: GrowthOpportunity[] = growthDomains.map(
    (domain, index) => ({
      rank: index + 1,
      domain: domain.domain,
      title: GROWTH_TITLES[domain.domain],
      detail: growthDetail(domain.domain, domain.score),
    }),
  );

  const overallScore = Math.round(
    domains.reduce((a, b) => a + b.score, 0) / domains.length,
  );

  const summary = SUMMARY_TEMPLATES[strongest.domain](
    STRENGTH_TITLES[strongest.domain].toLowerCase(),
    GROWTH_TITLES[weakest.domain].toLowerCase(),
  );

  const participant: AssessmentResult["participant"] = {
    firstName: (session.participant.firstName || "").trim(),
    lastName: (session.participant.lastName || "").trim(),
    email: (session.participant.email || "").trim(),
  };

  return {
    participant,
    assessment: {
      title: assessment.title,
      subtitle: assessment.subtitle,
      version: assessment.version,
      isMock: assessment.isMock,
    },
    completedAt: new Date().toISOString(),
    overallScore,
    summary,
    domains,
    strengths,
    growthOpportunities,
    disclaimer: RESULT_DISCLAIMER,
  };
}

function strengthDetail(domain: DomainCode, _score?: number): string {
  switch (domain) {
    case "SEE":
      return "You tend to notice possibilities and meaningful problems that others overlook.";
    case "THINK":
      return "You tend to weigh options and reason carefully before committing.";
    case "BUILD":
      return "You tend to move ideas into action and follow through.";
    case "GROW":
      return "You tend to think about how value survives contact with the real world.";
    case "LEAD":
      return "You demonstrate strong ownership, responsibility, and care for people.";
  }
}

function growthDetail(domain: DomainCode, _score?: number): string {
  switch (domain) {
    case "SEE":
      return "A sharper discovery habit — asking users and validating problems — will multiply your insight.";
    case "THINK":
      return "Making your reasoning more evidence-based will raise the quality of your decisions.";
    case "BUILD":
      return "Building smaller experiments and testing early will help ideas hold up in reality.";
    case "GROW":
      return "Thinking through customers, pricing, and business models will make your value sustainable.";
    case "LEAD":
      return "Practicing influence and communication will let your ideas move more people.";
  }
}

export function overallLevelFor(result: AssessmentResult): ScoreLevel {
  return levelFor(result.overallScore);
}

export type { Participant };