import type { Participant } from "@/lib/assessment/types";

/**
 * Pure validation for the participant details form (§21–23, §57).
 * Kept side-effect free so it can be unit tested directly.
 */

export type ParticipantErrors = Partial<
  Record<
    | "firstName"
    | "lastName"
    | "email"
    | "phone"
    | "consent"
    | "ageRange"
    | "currentStatus"
    | "educationLevel"
    | "primaryGoal",
    string
  >
>;

export interface ValidationResult {
  valid: boolean;
  errors: ParticipantErrors;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateEmail(email: string): boolean {
  return EMAIL_RE.test(email.trim());
}

export function validatePhone(countryDialCode: string, phone: string): boolean {
  const digits = `${countryDialCode}${phone}`.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15;
}

/**
 * Validates the combined participant input.
 * `requiredOptional` marks whether additional (optional) sections have to be
 * chosen — the assessment does not require them, so the default is false.
 */
export function validateParticipant(
  input: Partial<Participant>,
  options: { requireConsent?: boolean; requireOptional?: boolean } = {},
): ValidationResult {
  const errors: ParticipantErrors = {};

  const firstName = input.firstName?.trim() ?? "";
  if (!firstName) {
    errors.firstName = "Please enter your first name.";
  } else if (firstName.length < 2) {
    errors.firstName = "First name must be at least 2 characters.";
  }

  const lastName = input.lastName?.trim() ?? "";
  if (!lastName) {
    errors.lastName = "Please enter your last name.";
  } else if (lastName.length < 2) {
    errors.lastName = "Last name must be at least 2 characters.";
  }

  const email = input.email?.trim() ?? "";
  if (!email) {
    errors.email = "Please enter your email address.";
  } else if (!validateEmail(email)) {
    errors.email = "Please enter a valid email address, e.g. name@gmail.com.";
  }

  if (!validatePhone(input.countryCode ?? "+234", input.phone ?? "")) {
    errors.phone = "Please enter a valid phone number (7–15 digits).";
  }

  if (options.requireConsent && input.consent !== true) {
    errors.consent = "Please agree to the privacy statement to continue.";
  }

  if (options.requireOptional) {
    if (!input.ageRange) errors.ageRange = "Please choose an option.";
    if (!input.currentStatus) errors.currentStatus = "Please choose an option.";
    if (!input.educationLevel) errors.educationLevel = "Please choose an option.";
    if (!input.primaryGoal) errors.primaryGoal = "Please choose an option.";
  }

  return { valid: Object.keys(errors).length === 0, errors };
}