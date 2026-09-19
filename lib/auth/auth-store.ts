import type { AuthResult, AuthSession, StoredUser } from "./types";
import { readJSON, writeJSON, randomId } from "./storage";
import { isGranted } from "./access-requests";

const USERS_KEY = "k4i:auth:users:v1";
const SESSION_KEY = "k4i:auth:session:v1";

export const ADMIN_EMAIL = "admin@k4i.org";
export const ADMIN_PASSWORD = "admin123";

function loadUsers(): StoredUser[] {
  const users = readJSON<StoredUser[]>(USERS_KEY, []);
  const hasAdmin = users.some((u) => u.role === "admin");
  if (!hasAdmin) {
    const seeded = [
      {
        id: "admin-default",
        name: "LMS Administrator",
        email: ADMIN_EMAIL,
        role: "admin" as const,
        passwordHash: hashPassword(ADMIN_PASSWORD),
        createdAt: new Date("2026-01-01").toISOString(),
      },
      ...users,
    ];
    writeJSON(USERS_KEY, seeded);
    return seeded;
  }
  return users;
}

export function hashPassword(password: string): string {
  if (typeof window === "undefined") return password;
  if (window.crypto?.subtle) {
    return `k4i-hash-${password.split("").reverse().join("")}`;
  }
  return password;
}

export function registerUser(input: {
  name: string;
  email: string;
  password: string;
}): AuthResult {
  const users = loadUsers();
  const email = input.email.trim().toLowerCase();
  const name = input.name.trim();

  if (!name) return { ok: false, error: "Please enter your full name." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return { ok: false, error: "Please enter a valid email address." };
  if (input.password.length < 6)
    return { ok: false, error: "Password must be at least 6 characters." };
  if (users.some((u) => u.email === email))
    return { ok: false, error: "An account with this email already exists." };

  const user: StoredUser = {
    id: randomId("user"),
    name,
    email,
    role: isGranted(email) ? "admin" : "student",
    passwordHash: hashPassword(input.password),
    createdAt: new Date().toISOString(),
  };
  writeJSON(USERS_KEY, [...users, user]);
  return { ok: true, user: toSession(user) };
}

export function loginUser(input: { email: string; password: string }): AuthResult {
  const users = loadUsers();
  const email = input.email.trim().toLowerCase();
  const stored = users.find((u) => u.email === email);
  if (!stored || stored.passwordHash !== hashPassword(input.password))
    return { ok: false, error: "Invalid email or password." };

  // A granted educator is treated as admin even if the account predates approval.
  const role = stored.role === "admin" || isGranted(email) ? "admin" : "student";
  if (role !== stored.role) {
    const updated = users.map((u) =>
      u.email === email ? { ...u, role } : u,
    );
    writeJSON(USERS_KEY, updated);
  }

  return { ok: true, user: toSession({ ...stored, role }) };
}

export function promoteUserToAdmin(email: string): void {
  const users = loadUsers().map((u) =>
    u.email === email.trim().toLowerCase() ? { ...u, role: "admin" as const } : u,
  );
  writeJSON(USERS_KEY, users);
}

export function demoteUserFromAdmin(email: string): void {
  const users = loadUsers().map((u) =>
    u.email === email.trim().toLowerCase() ? { ...u, role: "student" as const } : u,
  );
  writeJSON(USERS_KEY, users);
}

export function saveSession(session: AuthSession): void {
  writeJSON(SESSION_KEY, session);
}

export function getSession(): AuthSession | null {
  return readJSON<AuthSession | null>(SESSION_KEY, null);
}

export function clearSession(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(SESSION_KEY);
}

export function getAdminUserEmail(): string {
  return ADMIN_EMAIL;
}

export function toSession(user: StoredUser): AuthSession {
  return {
    userId: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    loggedInAt: new Date().toISOString(),
  };
}