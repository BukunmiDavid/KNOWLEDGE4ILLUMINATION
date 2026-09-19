"use client";

import { useCallback, useEffect, useState } from "react";
import type { AuthSession } from "./types";
import {
  getSession,
  clearSession,
  loginUser,
  registerUser,
  saveSession,
} from "./auth-store";

export function useAuth() {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    (async () => {
      setSession(getSession());
      setHydrated(true);
    })();
  }, []);

  const login = useCallback(
    (email: string, password: string) => {
      const result = loginUser({ email, password });
      if (result.ok && result.user) {
        saveSession(result.user);
        setSession(result.user);
      }
      return result;
    },
    [],
  );

  const register = useCallback(
    (name: string, email: string, password: string) => {
      const result = registerUser({ name, email, password });
      if (result.ok && result.user) {
        saveSession(result.user);
        setSession(result.user);
      }
      return result;
    },
    [],
  );

  const logout = useCallback(() => {
    clearSession();
    setSession(null);
  }, []);

  return {
    user: session,
    isAuthenticated: Boolean(session),
    isAdmin: session?.role === "admin",
    hydrated,
    login,
    register,
    logout,
  };
}