"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/90 shadow-sm backdrop-blur-lg"
          : "bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="Knowledge4Illumination Home">
          <Logo />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link href="/" className="text-sm font-medium text-ink-soft hover:text-royal-700 transition-colors">Home</Link>
          <Link href="/#about" className="text-sm font-medium text-ink-soft hover:text-royal-700 transition-colors">About K4I</Link>
          <Link href="/#how-it-works" className="text-sm font-medium text-ink-soft hover:text-royal-700 transition-colors">How It Works</Link>
          <Link href="/assessments" className="text-sm font-medium text-ink-soft hover:text-royal-700 transition-colors">Assessments</Link>
          <Link href="/assessments/leadership-entrepreneurship">
            <Button variant="primary" size="sm">Take the Assessment</Button>
          </Link>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-xl text-ink-soft transition-colors hover:bg-royal-50 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            {mobileOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-line bg-white/95 px-4 pb-6 pt-4 shadow-lg backdrop-blur-lg md:hidden">
          <div className="flex flex-col gap-4">
            <Link href="/" className="text-sm font-medium text-ink" onClick={() => setMobileOpen(false)}>Home</Link>
            <Link href="/#about" className="text-sm font-medium text-ink" onClick={() => setMobileOpen(false)}>About K4I</Link>
            <Link href="/#how-it-works" className="text-sm font-medium text-ink" onClick={() => setMobileOpen(false)}>How It Works</Link>
            <Link href="/assessments" className="text-sm font-medium text-ink" onClick={() => setMobileOpen(false)}>Assessments</Link>
            <Link href="/assessments/leadership-entrepreneurship" onClick={() => setMobileOpen(false)}>
              <Button variant="primary" size="md" className="w-full">Take the Assessment</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}