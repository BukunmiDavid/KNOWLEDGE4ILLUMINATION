export type UserRole = "student" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
}

export interface StoredUser extends User {
  passwordHash: string;
}

export interface AuthSession {
  userId: string;
  email: string;
  name: string;
  role: UserRole;
  loggedInAt: string;
}

export interface AuthResult {
  ok: boolean;
  error?: string;
  user?: AuthSession;
}