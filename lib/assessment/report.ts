import type {
  Assessment,
  AssessmentResult,
  DomainCode,
} from "@/lib/assessment/types";

/**
 * Temporary report builder for the frontend-first build.
 *
 * Produces a clean, professional, self-contained HTML report that can be
 * printed/saved as PDF. The interface is stable: once the real PDF engine
 * connects, only the implementation inside this module changes.
 */

const DOMAIN_LABEL: Record<DomainCode, string> = {
  SEE: "See opportunities & problems",
  THINK: "Think through decisions",
  BUILD: "Build solutions",
  GROW: "Grow sustainable value",
  LEAD: "Lead yourself & others",
};

const LEVEL_LABEL = {
  EMERGING: "Emerging",
  DEVELOPING: "Developing",
  ESTABLISHED: "Established",
  ADVANCING: "Advancing",
} as const;

function bar(score: number): string {
  return `<div style="max-width:340px;height:8px;border-radius:999px;background:#e4e8ef;overflow:hidden;">
    <div style="width:${score}%;height:100%;border-radius:999px;background:linear-gradient(90deg,#1e3a8a,#3a5cbc);"></div>
  </div>`;
}

export function buildReportHtml(
  assessment: Pick<Assessment, "title" | "subtitle">,
  result: AssessmentResult,
): string {
  const name = `${result.participant.firstName} ${result.participant.lastName}`.trim();
  const date = new Date(result.completedAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const domainRows = result.domains
    .map(
      (domain) => `
    <tr>
      <td style="padding:10px 0;font-weight:800;color:#1e3a8a;font-size:15px;">${domain.domain}</td>
      <td style="padding:10px 0;color:#5d6b84;font-size:13px;width:220px;">${DOMAIN_LABEL[domain.domain]}</td>
      <td style="padding:10px 0;width:220px;">${bar(domain.score)}</td>
      <td style="padding:10px 0;text-align:right;font-weight:800;color:#1d2637;font-size:15px;">${domain.score}<span style="color:#93a0b5;font-weight:600;font-size:12px;"> / 100</span></td>
      <td style="padding:10px 0;text-align:right;color:#b08e25;font-size:12px;font-weight:700;">${LEVEL_LABEL[domain.level]}</td>
    </tr>`,
    )
    .join("");

  const strengths = result.strengths
    .map(
      (s) => `
    <div style="margin-bottom:14px;">
      <div style="font-weight:800;color:#1e3a8a;font-size:14px;">${String(s.rank).padStart(2, "0")} · ${s.title}</div>
      <div style="color:#3c4659;font-size:13px;line-height:1.55;">${s.detail}</div>
    </div>`,
    )
    .join("");

  const growth = result.growthOpportunities
    .map(
      (g) => `
    <div style="margin-bottom:14px;">
      <div style="font-weight:800;color:#b08e25;font-size:14px;">${String(g.rank).padStart(2, "0")} · ${g.title}</div>
      <div style="color:#3c4659;font-size:13px;line-height:1.55;">${g.detail}</div>
    </div>`,
    )
    .join("");

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>${assessment.title} — ${name}</title>
<style>
  @media print { @page { margin: 18mm; } }
  body { font-family: 'Segoe UI', system-ui, -apple-system, sans-serif; color: #1d2637; margin: 0; background: #ffffff; }
  .report { max-width: 760px; margin: 0 auto; padding: 40px 32px; }
  .brand { display: flex; align-items: center; gap: 10px; margin-bottom: 28px; }
  .brand-bar { width: 34px; height: 34px; border-radius: 10px; background: linear-gradient(135deg,#274ba8,#0f1e4e); display: flex; align-items: center; justify-content: center; color: #ffffff; font-weight: 900; font-size: 15px; }
  h1 { font-size: 26px; margin: 0; color: #1e3a8a; }
  .sub { color: #5d6b84; font-size: 14px; margin-top: 4px; }
  .meta { display: flex; flex-wrap: wrap; gap: 8px 28px; border-top: 1px solid #e4e8ef; border-bottom: 1px solid #e4e8ef; padding: 14px 0; margin: 20px 0; font-size: 13px; color: #3c4659; }
  .meta b { color: #1d2637; }
  section { margin: 30px 0; }
  h2 { font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase; color: #b08e25; margin: 0 0 14px; }
  .score-big { font-size: 40px; font-weight: 800; color: #1e3a8a; margin: 0; }
  .score-label { color: #5d6b84; font-size: 13px; }
  .summary { background: #f6f8fb; border: 1px solid #e4e8ef; border-radius: 14px; padding: 18px 20px; font-size: 14px; line-height: 1.65; color: #1d2637; }
  table { width: 100%; border-collapse: collapse; }
  .framework { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-top: 12px; font-weight: 800; color: #1e3a8a; }
  .framework .arrow { color: #d4af37; font-weight: 700; }
  .foot { margin-top: 34px; color: #93a0b5; font-size: 11px; line-height: 1.6; }
  .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 26px; }
  @media (max-width: 640px) { .two-col { grid-template-columns: 1fr; } }
</style>
</head>
<body>
  <div class="report">
    <div class="brand">
      <div class="brand-bar">K</div>
      <div>
        <h1>Knowledge4Illumination</h1>
        <div class="sub">${assessment.title}</div>
      </div>
    </div>

    <div class="meta">
      <div><b>Participant</b><br />${name}</div>
      <div><b>Email</b><br />${result.participant.email}</div>
      <div><b>Completed</b><br />${date}</div>
      <div><b>Assessment</b><br />${assessment.title}</div>
    </div>

    <section>
      <h2>Overall Profile</h2>
      <p class="score-big">${result.overallScore}<span style="font-size:16px;color:#93a0b5;"> / 100</span></p>
      <p class="summary">${result.summary}</p>
    </section>

    <section>
      <h2>Capability Profile</h2>
      <table>
        <tbody>${domainRows}</tbody>
      </table>
    </section>

    <section>
      <div class="two-col">
        <div>
          <h2>Strengths</h2>
          ${strengths}
        </div>
        <div>
          <h2>Growth Opportunities</h2>
          ${growth}
        </div>
      </div>
    </section>

    <section>
      <h2>K4I Development Framework</h2>
      <div class="framework">
        <span>SEE</span><span class="arrow">→</span>
        <span>THINK</span><span class="arrow">→</span>
        <span>BUILD</span><span class="arrow">→</span>
        <span>GROW</span><span class="arrow">→</span>
        <span>LEAD</span><span class="arrow">→</span>
        <span>IMPACT</span>
      </div>
      <div class="foot">
        ${result.disclaimer}<br />
        Capability interpretation is a developmental snapshot of self-reported responses, not a validated measure.
        © Knowledge4Illumination. All rights reserved.
      </div>
    </section>
  </div>
</body>
</html>`;
}

export function buildReportBlob(
  assessment: Pick<Assessment, "title" | "subtitle">,
  result: AssessmentResult,
  filename: string,
): { blob: Blob; filename: string } {
  const html = buildReportHtml(assessment, result);
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  return { blob, filename: `${filename}.html` };
}