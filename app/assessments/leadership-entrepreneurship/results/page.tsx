"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SiteHeader } from "@/components/navigation/SiteHeader";
import { SiteFooter } from "@/components/navigation/SiteFooter";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { MockAssessmentService } from "@/lib/assessment/service";
import type { AssessmentResult, DomainCode } from "@/lib/assessment/types";

const DOMAIN_COLORS: Record<DomainCode, string> = {
  SEE: "#1e3a8a",
  THINK: "#274ba8",
  BUILD: "#3a5cbc",
  GROW: "#b08e25",
  LEAD: "#8c701f",
};

export default function ResultsPage() {
  const router = useRouter();
  const [result, setResult] = useState<AssessmentResult | null>(null);

  useEffect(() => {
    (async () => {
      const r = await MockAssessmentService.getResult();
      if (!r) { router.replace("/assessments/leadership-entrepreneurship"); return; }
      setResult(r);
    })();
  }, [router]);

  if (!result) {
    return <div className="flex min-h-screen items-center justify-center"><p className="text-muted">Loading results...</p></div>;
  }

  function handleDownload() {
    if (!result) return;
    const { blob, filename } = MockAssessmentService.generateReport(result);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  function handleEmail() {
    if (!result) return;
    const name = `${result.participant.firstName} ${result.participant.lastName}`.trim();
    const subject = encodeURIComponent(
      `Your K4I Leadership & Entrepreneurship Results — ${name}`,
    );
    const bodyLines = [
      `Hi ${result.participant.firstName},`,
      "",
      "Here is a summary of your K4I Leadership & Entrepreneurship assessment:",
      "",
      `Overall Score: ${result.overallScore}/100`,
      "",
      "Capability profile:",
      ...result.domains.map((d) => `  - ${d.domain} (${d.score}/100) — ${d.level}`),
      "",
      "Top strengths:",
      ...result.strengths.map((s) => `  - ${s.title}`),
      "",
      "Growth opportunities:",
      ...result.growthOpportunities.map((g) => `  - ${g.title}`),
      "",
      "Your full report is attached as the colour-style HTML file you downloaded from the results page.",
      "",
      "Warm regards,",
      "Knowledge4Illumination (K4I)",
    ];
    const body = encodeURIComponent(bodyLines.join("\n"));
    window.location.href = `mailto:${result.participant.email}?subject=${subject}&body=${body}`;
  }

  return (
    <>
      <SiteHeader />
      <main className="flex-1 pt-28 pb-20">
        <Container className="max-w-3xl">
          {/* Hero */}
          <div className="text-center">
            <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">Your K4I Capability Profile</h1>
            <p className="mt-2 text-lg font-semibold text-royal-700">
              {result.participant.firstName} {result.participant.lastName}
            </p>
          </div>

          {/* Overall score */}
          <Card className="mt-10 p-8 text-center">
            <p className="text-5xl font-extrabold text-royal-700">{result.overallScore}<span className="text-lg text-faint"> / 100</span></p>
            <p className="mt-4 max-w-lg mx-auto text-sm text-muted leading-relaxed">{result.summary}</p>
          </Card>

          {/* Radar chart */}
          <div className="mt-10 flex justify-center">
            <RadarChart domains={result.domains} />
          </div>

          {/* Domain cards */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {result.domains.map((d) => (
              <Card key={d.domain} className="flex flex-col gap-3 p-5">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full" style={{ backgroundColor: DOMAIN_COLORS[d.domain] }} />
                  <span className="font-extrabold text-ink">{d.domain}</span>
                  <span className="ml-auto text-sm font-bold text-ink">{d.score}</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-surface">
                  <div className="h-full rounded-full transition-all" style={{ width: `${d.score}%`, backgroundColor: DOMAIN_COLORS[d.domain] }} />
                </div>
                <p className="text-xs text-muted">{d.summary}</p>
              </Card>
            ))}
          </div>

          {/* Strengths */}
          <section className="mt-12">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gold-600">Your Strengths</h2>
            <div className="mt-4 space-y-4">
              {result.strengths.map((s) => (
                <Card key={s.rank} className="flex gap-4 p-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-royal-50 text-lg font-extrabold text-royal-700">
                    {String(s.rank).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-bold text-ink">{s.title}</h3>
                    <p className="text-sm text-muted">{s.detail}</p>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Growth opportunities */}
          <section className="mt-12">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gold-600">Growth Opportunities</h2>
            <div className="mt-4 space-y-4">
              {result.growthOpportunities.map((g) => (
                <Card key={g.rank} className="flex gap-4 p-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-50 text-lg font-extrabold text-gold-700">
                    {String(g.rank).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-bold text-ink">{g.title}</h3>
                    <p className="text-sm text-muted">{g.detail}</p>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Disclaimer */}
          <p className="mt-10 text-center text-xs text-faint leading-relaxed">{result.disclaimer}</p>

          {/* Download */}
          <div className="mt-8 flex flex-col items-center gap-3">
            <Button variant="primary" size="lg" onClick={handleDownload}>Download My Results</Button>
            <Button variant="secondary" size="md" onClick={handleEmail}>Email My Results</Button>
          </div>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}

/* ── Inline SVG radar chart (no deps) ── */

function RadarChart({ domains }: { domains: AssessmentResult["domains"] }) {
  const cx = 140, cy = 130, r = 100;
  const n = domains.length;
  const angleStep = (2 * Math.PI) / n;

  function pointAt(score: number, i: number) {
    const angle = angleStep * i - Math.PI / 2;
    const dist = (score / 100) * r;
    return { x: cx + dist * Math.cos(angle), y: cy + dist * Math.sin(angle) };
  }

  const gridLevels = [20, 40, 60, 80, 100];
  const polygonPoints = domains.map((d, i) => {
    const p = pointAt(d.score, i);
    return `${p.x},${p.y}`;
  }).join(" ");

  return (
    <svg viewBox="0 0 280 260" className="w-full max-w-xs" role="img" aria-label="Capability radar chart">
      {/* Grid */}
      {gridLevels.map((level) => {
        const pts = Array.from({ length: n }, (_, i) => {
          const angle = angleStep * i - Math.PI / 2;
          return `${cx + (level / 100) * r * Math.cos(angle)},${cy + (level / 100) * r * Math.sin(angle)}`;
        }).join(" ");
        return <polygon key={level} points={pts} fill="none" stroke="#e4e8ef" strokeWidth="1" />;
      })}
      {/* Axes */}
      {domains.map((_, i) => {
        const angle = angleStep * i - Math.PI / 2;
        return <line key={i} x1={cx} y1={cy} x2={cx + r * Math.cos(angle)} y2={cy + r * Math.sin(angle)} stroke="#e4e8ef" strokeWidth="1" />;
      })}
      {/* Score polygon */}
      <polygon points={polygonPoints} fill="rgba(30,58,138,0.12)" stroke="#1e3a8a" strokeWidth="2" />
      {/* Dots + labels */}
      {domains.map((d, i) => {
        const p = pointAt(d.score, i);
        const angle = angleStep * i - Math.PI / 2;
        const labelDist = r + 22;
        const lx = cx + labelDist * Math.cos(angle);
        const ly = cy + labelDist * Math.sin(angle);
        return (
          <g key={d.domain}>
            <circle cx={p.x} cy={p.y} r="4" fill={DOMAIN_COLORS[d.domain]} />
            <text x={lx} y={ly} textAnchor="middle" dominantBaseline="central" className="fill-ink text-[11px] font-bold">{d.domain}</text>
            <text x={lx} y={ly + 14} textAnchor="middle" dominantBaseline="central" className="fill-muted text-[10px]">{d.score}</text>
          </g>
        );
      })}
    </svg>
  );
}