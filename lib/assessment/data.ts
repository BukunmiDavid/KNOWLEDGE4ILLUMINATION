import type {
  Assessment,
  AssessmentOption,
  Domain,
  DomainCode,
  QuestionType,
} from "@/lib/assessment/types";

/**
 * DEMO / MOCK assessment data (v1).
 * Representative of the K4I framework. NOT the final validated K4I scoring set.
 * `assessment.isMock` is true so the UI can label the experience honestly.
 */

export const K4I_DOMAINS: Domain[] = [
  {
    code: "SEE",
    name: "SEE",
    tagline: "Recognize Problems & Opportunities",
    description:
      "Understand how well you observe your environment, identify meaningful problems, recognize opportunities, and understand users.",
    order: 1,
  },
  {
    code: "THINK",
    name: "THINK",
    tagline: "Reason, Question & Decide",
    description:
      "Understand how you analyze problems, evaluate evidence, assess risk, think strategically, and make decisions under uncertainty.",
    order: 2,
  },
  {
    code: "BUILD",
    name: "BUILD",
    tagline: "Turn Ideas Into Action",
    description:
      "Understand how you plan, execute, experiment, test, validate, adapt, and build solutions.",
    order: 3,
  },
  {
    code: "GROW",
    name: "GROW",
    tagline: "Create Sustainable Value",
    description:
      "Understand how you think about customers, value propositions, pricing, marketing, sales, revenue, business models, and sustainability.",
    order: 4,
  },
  {
    code: "LEAD",
    name: "LEAD",
    tagline: "Lead Yourself & Others",
    description:
      "Understand how you communicate, collaborate, manage conflict, take responsibility, influence others, and lead ethically.",
    order: 5,
  },
];

const DOMAIN_NAME: Record<DomainCode, string> = Object.fromEntries(
  K4I_DOMAINS.map((domain) => [domain.code, domain.tagline]),
) as Record<DomainCode, string>;

function question(
  id: string,
  order: number,
  domain: DomainCode,
  type: QuestionType,
  prompt: string,
  optionLabels: string[],
  context?: string,
): AssessmentQuestionLike {
  return { id, order, domain, type, prompt, context, optionLabels };
}

interface AssessmentQuestionLike {
  id: string;
  order: number;
  domain: DomainCode;
  type: QuestionType;
  prompt: string;
  context?: string;
  optionLabels: string[];
}

const LIKERT = ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"];
const SJT_START = [
  "Feeling and asking people — consider user interviews.",
  "Planning and documenting the problem thoroughly.",
  "Moving quickly to a prototype and testing it.",
  "Waiting for the situation to become clearer.",
];

const RAW: AssessmentQuestionLike[] = [
  // ---------------- SEE: recognize problems & opportunities ----------------
  question("SEE01", 1, "SEE", "likert", "When I notice a problem affecting people, I take time to understand it before assuming its causes.", LIKERT),
  question("SEE02", 2, "SEE", "likert", "I often notice opportunities that others walk past.", LIKERT),
  question("SEE03", 3, "SEE", "likert", "I regularly ask others about their struggles and unmet needs.", LIKERT),
  question("SEE04", 4, "SEE", "likert", "I can describe clearly who a problem affects and why it matters.", LIKERT),
  question("SEE05", 5, "SEE", "likert", "When something is inefficient, I immediately spot a better way.", LIKERT),
  question("SEE06", 6, "SEE", "likert", "I look beyond my personal experience to understand how others experience things.", LIKERT),
  question("SEE07", 7, "SEE", "likert", "I am good at turning vague complaints into a clearly defined problem.", LIKERT),
  question("SEE08", 8, "SEE", "likert", "I pay attention to trends early, before they become obvious to everyone.", LIKERT),
  question(
    "SEE09",
    9,
    "SEE",
    "situational_judgment",
    "A colleague frequently says business is slow but cannot explain why. What do you usually do first?",
    SJT_START,
    "Your instinctive first action says the most about how you SEE.",
  ),
  question("SEE10", 10, "SEE", "likert", "I understand that a real opportunity solves a problem someone actually has.", LIKERT),

  // ---------------- THINK: reason, question & decide ----------------
  question("THK01", 11, "THINK", "likert", "Before deciding, I weigh the likely consequences of each option.", LIKERT),
  question("THK02", 12, "THINK", "likert", "I question assumptions — including my own.", LIKERT),
  question("THK03", 13, "THINK", "likert", "I look for evidence before I accept a explanation as true.", LIKERT),
  question("THK04", 14, "THINK", "likert", "When information is limited, I still make a decision and move forward.", LIKERT),
  question("THK05", 15, "THINK", "likert", "I can explain the reasoning behind my decisions to others.", LIKERT),
  question("THK06", 16, "THINK", "likert", "I consider what could go wrong before I commit to a plan.", LIKERT),
  question("THK07", 17, "THINK", "likert", "I think several steps ahead about how decisions affect people and outcomes.", LIKERT),
  question("THK08", 18, "THINK", "likert", "When I disagree with the majority, I still voice a reasoned position.", LIKERT),
  question("THK09", 19, "THINK", "likert", "I break big, messy problems into smaller parts to make them manageable.", LIKERT),
  question(
    "THK10",
    20,
    "THINK",
    "situational_judgment",
    "Two team members propose opposite solutions. Both sound plausible. What do you do?",
    [
      "Compare both using clear criteria and available data.",
      "Go with the more experienced person's suggestion.",
      "Test both ideas on a small scale before choosing.",
      "Delay the decision until the risk is resolved.",
    ],
  ),

  // ---------------- BUILD: turn ideas into action ----------------
  question("BLD01", 21, "BUILD", "likert", "When I have an idea, I usually start doing something about it quickly.", LIKERT),
  question("BLD02", 22, "BUILD", "likert", "I make simple first versions rather than waiting for things to be perfect.", LIKERT),
  question("BLD03", 23, "BUILD", "likert", "I test my ideas with real people before investing heavily.", LIKERT),
  question("BLD04", 24, "BUILD", "likert", "When something fails, I adjust and try again instead of giving up.", LIKERT),
  question("BLD05", 25, "BUILD", "likert", "I write down plans that turn goals into concrete steps.", LIKERT),
  question("BLD06", 26, "BUILD", "likert", "I am comfortable starting tasks even when every detail is not yet clear.", LIKERT),
  question("BLD07", 27, "BUILD", "likert", "I ask for feedback early and use it to improve what I make.", LIKERT),
  question("BLD08", 28, "BUILD", "likert", "I keep manageable focus and refuse to be distracted by new shiny ideas.", LIKERT),
  question(
    "BLD09",
    29,
    "BUILD",
    "applied_challenge",
    "You have 90 minutes and basic materials to save your school library an hour per day. What do you do?",
    [
      "Build the smallest useful tool that removes one step of friction.",
      "Map every workflow first so the solution is complete.",
      "Prototype something rough and let a librarian try it immediately.",
      "Delegate parts and coordinate others to build in parallel.",
    ],
  ),
  question("BLD10", 30, "BUILD", "likert", "I follow through and finish what I start, even when the excitement fades.", LIKERT),

  // ---------------- GROW: create sustainable value ----------------
  question("GRW01", 31, "GROW", "likert", "I think carefully about who my customers are and what they value.", LIKERT),
  question("GRW02", 32, "GROW", "likert", "I can explain the value my work creates for others in simple terms.", LIKERT),
  question("GRW03", 33, "GROW", "likert", "I consider how a good idea becomes a sustainable one over time.", LIKERT),
  question("GRW04", 34, "GROW", "likert", "I am aware of my costs and revenues when running an idea.", LIKERT),
  question("GRW05", 35, "GROW", "likert", "I look for ways to reach people who could benefit from what I offer.", LIKERT),
  question("GRW06", 36, "GROW", "likert", "I learn from why people say no, not just why they say yes.", LIKERT),
  question("GRW07", 37, "GROW", "likert", "I think about the repeatable parts of what I do, not just one-off effort.", LIKERT),
  question("GRW08", 38, "GROW", "likert", "I measure whether my work creates more value than it consumes.", LIKERT),
  question(
    "GRW09",
    39,
    "GROW",
    "situational_judgment",
    "Your service is praised by a few customers but not growing. What do you examine first?",
    [
      "Why existing customers stay and what would make them recommend you.",
      "How to lower the price to attract more people.",
      "Which tasks in your process take too long or cost too much.",
      "Whether you need a bigger marketing push across channels.",
    ],
  ),
  question("GRW10", 40, "GROW", "likert", "I can describe how my offering could keep delivering value in five years.", LIKERT),

  // ---------------- LEAD: lead yourself & others ----------------
  question("LDR01", 41, "LEAD", "likert", "I communicate my ideas clearly so others understand my intention.", LIKERT),
  question("LDR02", 42, "LEAD", "likert", "I listen to understand before I respond.", LIKERT),
  question("LDR03", 43, "LEAD", "likert", "I take responsibility for my mistakes rather than shifting blame.", LIKERT),
  question("LDR04", 44, "LEAD", "likert", "I am comfortable coordinating a small group toward a shared goal.", LIKERT),
  question("LDR05", 45, "LEAD", "likert", "When people disagree, I help the group reach a fair way forward.", LIKERT),
  question("LDR06", 46, "LEAD", "likert", "I keep my commitments even when it is inconvenient.", LIKERT),
  question("LDR07", 47, "LEAD", "likert", "I inspire people around me by showing, not only telling.", LIKERT),
  question("LDR08", 48, "LEAD", "likert", "I treat people fairly regardless of their background or status.", LIKERT),
  question(
    "LDR09",
    49,
    "LEAD",
    "multiple_choice",
    "A teammate quietly misses commitments without explaining. What is your most likely response?",
    [
      "Check in privately to understand the reason.",
      "Reassign the work to keep the team moving.",
      "Address it with the whole team openly.",
      "Wait to see if the next week improves.",
    ],
  ),
  question(
    "LDR10",
    50,
    "LEAD",
    "short_response",
    "Describe a moment when you took responsibility for something that was not officially yours.",
    [],
    "One or two sentences are enough.",
  ),
];

function buildOptions(qid: string, type: QuestionType, labels: string[]): AssessmentOption[] {
  if (type === "short_response") return [];
  return labels.map((label, index) => ({
    id: `${qid}:${index + 1}`,
    label,
    value: type === "likert" ? index + 1 : index + 1,
  }));
}

export const LEADERSHIP_ENTREPRENEURSHIP: Assessment = {
  slug: "leadership-entrepreneurship",
  code: "K4I_LE_SELF_01",
  title: "Leadership & Entrepreneurship Assessment",
  subtitle: "Discover how you see opportunities, think through problems, build solutions, grow ideas, and lead people.",
  description:
    "This assessment is designed to help you understand how you currently see opportunities, think through problems, build solutions, create value, and lead.",
  domains: K4I_DOMAINS,
  questions: RAW.map((raw) => ({
    id: raw.id,
    domain: raw.domain,
    order: raw.order,
    type: raw.type,
    prompt: raw.prompt,
    context: raw.context,
    maxLength: raw.type === "short_response" ? 280 : undefined,
    options: buildOptions(raw.id, raw.type, raw.optionLabels),
  })),
  estimatedMinutes: 12,
  version: "mock-1.0",
  isMock: true,
};

export function domainById(code: DomainCode) {
  return K4I_DOMAINS.find((domain) => domain.code === code)!;
}

export { DOMAIN_NAME };