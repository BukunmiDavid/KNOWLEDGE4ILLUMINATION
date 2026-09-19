"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { IconMenu, IconClose, IconLogOut } from "@/components/ui/icons";
import { useAuth } from "@/lib/auth/useAuth";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/assessments", label: "Assessments" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/courses", label: "Courses" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, hydrated, logout } = useAuth();
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = (
    <>
      {navLinks.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          className="text-sm font-medium text-ink-soft transition-colors hover:text-royal-700"
        >
          {l.label}
        </Link>
      ))}
    </>
  );

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b border-line/60 bg-white shadow-sm transition-all duration-300",
        scrolled && "shadow-md",
      )}
    >
      <nav className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="K4I — Home">
          <Logo />
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {links}
          {hydrated ? (
            user ? (
              <>
                {isAdmin ? (
                  <Link
                    href="/admin"
                    className="text-sm font-medium text-ink-soft transition-colors hover:text-royal-700"
                  >
                    Admin
                  </Link>
                ) : null}
                <Button variant="primary" size="sm" onClick={logout}>
                  <IconLogOut />
                  Sign out
                </Button>
              </>
            ) : (
              <Link href="/register">
                <Button variant="primary" size="sm">Get Started Free</Button>
              </Link>
            )
          ) : (
            <Link href="/register">
              <Button variant="primary" size="sm">Get Started Free</Button>
            </Link>
          )}
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-xl text-ink-soft transition-colors hover:bg-royal-50 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <IconClose /> : <IconMenu />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-line/60 bg-white px-6 pb-6 pt-4 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-ink-soft transition-colors hover:text-royal-700"
                onClick={() => setMobileOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <div className="flex flex-col gap-3 pt-2">
              {hydrated && user ? (
                <>
                  {isAdmin ? (
                    <Link href="/admin" onClick={() => setMobileOpen(false)}>
                      <Button variant="ghost" size="md" className="w-full">Admin</Button>
                    </Link>
                  ) : null}
                  <Button variant="primary" size="md" className="w-full" onClick={() => { logout(); setMobileOpen(false); }}>
                    <IconLogOut />
                    Sign out
                  </Button>
                </>
              ) : (
                <Link href="/register" onClick={() => setMobileOpen(false)}>
                  <Button variant="primary" size="md" className="w-full">Get Started Free</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
