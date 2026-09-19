import { readJSON, writeJSON, randomId } from "./storage";

const REQUESTS_KEY = "k4i:auth:requests:v1";
const GRANTED_KEY = "k4i:auth:granted:v1";

export const SUPPORT_EMAIL = "hello@k4i.org";

export type AccessRequestStatus = "pending" | "approved" | "declined";

export interface AccessRequest {
  id: string;
  name: string;
  email: string;
  organization?: string;
  message: string;
  status: AccessRequestStatus;
  createdAt: string;
}

export function loadAccessRequests(): AccessRequest[] {
  return readJSON<AccessRequest[]>(REQUESTS_KEY, []);
}

export function submitAccessRequest(input: {
  name: string;
  email: string;
  organization?: string;
  message: string;
}): AccessRequest {
  const request: AccessRequest = {
    id: randomId("req"),
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    organization: input.organization?.trim() || undefined,
    message: input.message.trim(),
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  writeJSON(REQUESTS_KEY, [request, ...loadAccessRequests()]);
  return request;
}

export function buildRequestMailto(request: AccessRequest): string {
  const subject = encodeURIComponent(
    `Educator access request from ${request.name}`,
  );
  const body = encodeURIComponent(
    [
      `Name: ${request.name}`,
      `Email: ${request.email}`,
      request.organization ? `Organization: ${request.organization}` : null,
      `Message: ${request.message}`,
    ]
      .filter(Boolean)
      .join("\n"),
  );
  return `mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${body}`;
}

export function getAccessRequestById(id: string): AccessRequest | undefined {
  return loadAccessRequests().find((r) => r.id === id);
}

export function updateAccessRequestStatus(
  id: string,
  status: AccessRequestStatus,
): void {
  const requests = loadAccessRequests().map((r) =>
    r.id === id ? { ...r, status } : r,
  );
  writeJSON(REQUESTS_KEY, requests);
}

function loadGrantedEmails(): string[] {
  return readJSON<string[]>(GRANTED_KEY, []);
}

export function isGranted(email: string): boolean {
  const normalized = email.trim().toLowerCase();
  return loadGrantedEmails().includes(normalized);
}

export function grantEmail(email: string): void {
  const granted = loadGrantedEmails();
  const normalized = email.trim().toLowerCase();
  if (!granted.includes(normalized)) {
    writeJSON(GRANTED_KEY, [...granted, normalized]);
  }
}

export function revokeEmail(email: string): void {
  const normalized = email.trim().toLowerCase();
  writeJSON(GRANTED_KEY, loadGrantedEmails().filter((e) => e !== normalized));
}