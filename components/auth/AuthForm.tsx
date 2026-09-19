"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/lib/auth/useAuth";
import type { AuthResult } from "@/lib/auth/types";

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const isLogin = mode === "login";
  const router = useRouter();
  const { login, register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [redirectTo] = useState<string | null>(() =>
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("next")
      : null,
  );

  const validate = (): boolean => {
    const next: Record<string, string> = {};
    if (!isLogin && !name.trim()) next.name = "Please enter your full name.";
    if (!email.trim()) next.email = "Please enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      next.email = "Enter a valid email address.";
    if (!password) next.password = "Please enter a password.";
    else if (!isLogin && password.length < 6)
      next.password = "Password must be at least 6 characters.";
    if (!isLogin && confirm !== password) next.confirm = "Passwords do not match.";
    setErrors(next);
    setFormError(null);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    const result: AuthResult = isLogin
      ? login(email, password)
      : register(name, email, password);

    if (!result.ok) {
      setFormError(result.error ?? "Something went wrong.");
      setSubmitting(false);
      return;
    }
    router.push(redirectTo ?? "/courses");
    router.refresh();
  };

  return (
    <form onSubmit={onSubmit} className="flex w-full flex-col gap-5">
      {!isLogin ? (
        <Input
          label="Full name"
          name="name"
          placeholder="Ada Lovelace"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
          autoComplete="name"
        />
      ) : null}

      <Input
        label="Email address"
        name="email"
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
        autoComplete="email"
      />

      <Input
        label="Password"
        name="password"
        type="password"
        placeholder={isLogin ? "Your password" : "At least 6 characters"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
        autoComplete={isLogin ? "current-password" : "new-password"}
      />

      {!isLogin ? (
        <Input
          label="Confirm password"
          name="confirm"
          type="password"
          placeholder="Repeat your password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          error={errors.confirm}
          autoComplete="new-password"
        />
      ) : null}

      {formError ? (
        <p
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700"
        >
          {formError}
        </p>
      ) : null}

      <Button type="submit" variant="primary" size="lg" className="w-full" disabled={submitting}>
        {submitting ? "Please wait..." : isLogin ? "Sign in" : "Create account"}
      </Button>

      <p className="text-center text-sm text-muted">
        {isLogin ? (
          <>
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-semibold text-royal-700 hover:underline">
              Create one free
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-royal-700 hover:underline">
              Sign in
            </Link>
          </>
        )}
      </p>
    </form>
  );
}