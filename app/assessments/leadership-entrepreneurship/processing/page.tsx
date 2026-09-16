"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/ui/Container";

const messages = [
  "Reviewing your responses...",
  "Mapping your capability profile...",
  "Preparing your results...",
  "Generating insights...",
];

export default function ProcessingPage() {
  const router = useRouter();
  const [msgIdx, setMsgIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setMsgIdx((i) => (i + 1) % messages.length), 1800);
    const done = setTimeout(() => {
      clearInterval(timer);
      router.replace("/assessments/leadership-entrepreneurship/results");
    }, 5000);
    return () => { clearInterval(timer); clearTimeout(done); };
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Container className="flex flex-col items-center gap-6 text-center">
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full border-4 border-line" />
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-t-royal-700 border-r-transparent border-b-transparent border-l-transparent" />
        </div>
        <h1 className="text-xl font-extrabold text-ink">Analyzing Your Responses</h1>
        <p className="text-sm text-muted transition-opacity duration-300">{messages[msgIdx]}</p>
      </Container>
    </div>
  );
}