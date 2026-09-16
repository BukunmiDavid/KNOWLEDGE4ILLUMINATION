"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { SiteHeader } from "@/components/navigation/SiteHeader";
import { SiteFooter } from "@/components/navigation/SiteFooter";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Card } from "@/components/ui/Card";
import { validateParticipant, type ParticipantErrors } from "@/lib/assessment/validation";
import { MockAssessmentService } from "@/lib/assessment/service";
import type { Participant } from "@/lib/assessment/types";

const AGE_RANGES = [
  { value: "UNDER_18", label: "Under 18" },
  { value: "18_24", label: "18–24" },
  { value: "25_34", label: "25–34" },
  { value: "35_44", label: "35–44" },
  { value: "45_54", label: "45–54" },
  { value: "55_PLUS", label: "55+" },
  { value: "PREFER_NOT_SAY", label: "Prefer not to say" },
];

const STATUS_OPTIONS = [
  { value: "STUDENT", label: "Student" },
  { value: "EMPLOYED", label: "Employed" },
  { value: "ENTREPRENEUR", label: "Entrepreneur" },
  { value: "JOB_SEEKER", label: "Job Seeker" },
  { value: "PROFESSIONAL", label: "Professional" },
  { value: "EDUCATOR", label: "Educator" },
  { value: "BUSINESS_OWNER", label: "Business Owner" },
  { value: "OTHER", label: "Other" },
];

const EDUCATION_OPTIONS = [
  { value: "SECONDARY", label: "Secondary School" },
  { value: "DIPLOMA", label: "Diploma" },
  { value: "BACHELOR", label: "Bachelor's Degree" },
  { value: "MASTER", label: "Master's Degree" },
  { value: "DOCTORATE", label: "Doctorate" },
  { value: "OTHER", label: "Other" },
];

const GOAL_OPTIONS = [
  { value: "CAREER_GROWTH", label: "Career Growth" },
  { value: "ENTREPRENEURSHIP", label: "Entrepreneurship" },
  { value: "LEADERSHIP_DEVELOPMENT", label: "Leadership Development" },
  { value: "PERSONAL_DEVELOPMENT", label: "Personal Development" },
  { value: "BUSINESS_GROWTH", label: "Business Growth" },
  { value: "EDUCATION", label: "Education" },
  { value: "OTHER", label: "Other" },
];

const COUNTRIES = [
  { value: "+234", label: "Nigeria (+234)" },
  { value: "+27", label: "South Africa (+27)" },
  { value: "+254", label: "Kenya (+254)" },
  { value: "+233", label: "Ghana (+233)" },
  { value: "+1", label: "United States (+1)" },
  { value: "+44", label: "United Kingdom (+44)" },
  { value: "+91", label: "India (+91)" },
  { value: "+212", label: "Morocco (+212)" },
  { value: "+216", label: "Tunisia (+216)" },
  { value: "+20", label: "Egypt (+20)" },
];

export default function DetailsPage() {
  const router = useRouter();
  const [form, setForm] = useState<Partial<Participant>>({
    countryCode: "+234",
  });
  const [errors, setErrors] = useState<ParticipantErrors>({});
  const [submitting, setSubmitting] = useState(false);

  function update<K extends keyof Participant>(field: K, value: Participant[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const result = validateParticipant(form, { requireConsent: true });
    if (!result.valid) {
      setErrors(result.errors);
      setSubmitting(false);
      return;
    }
    try {
      await MockAssessmentService.startAssessment("leadership-entrepreneurship", form as Participant);
      router.push("/assessments/leadership-entrepreneurship/questions");
    } catch {
      setSubmitting(false);
    }
  }

  return (
    <>
      <SiteHeader />
      <main className="flex-1 pt-28 pb-20">
        <Container className="max-w-2xl">
          <h1 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">Tell Us About You</h1>
          <p className="mt-2 text-sm text-muted">
            We need a few details to deliver your results. This information is not used for authentication.
          </p>

          <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-8">
            {/* Required */}
            <Card className="p-6 space-y-5">
              <h2 className="text-sm font-bold uppercase tracking-wider text-royal-700">Required Information</h2>
              <div className="grid gap-5 sm:grid-cols-2">
                <Input label="First Name" name="firstName" value={form.firstName ?? ""} onChange={(e) => update("firstName", e.target.value)} error={errors.firstName} required />
                <Input label="Last Name" name="lastName" value={form.lastName ?? ""} onChange={(e) => update("lastName", e.target.value)} error={errors.lastName} required />
              </div>
              <Input label="Email" name="email" type="email" placeholder="name@gmail.com" value={form.email ?? ""} onChange={(e) => update("email", e.target.value)} error={errors.email} required />
              <div className="grid gap-5 sm:grid-cols-5">
                <Select label="Country Code" name="countryCode" options={COUNTRIES} value={form.countryCode ?? "+234"} onChange={(e) => update("countryCode", e.target.value)} className="sm:col-span-2" />
                <Input label="Phone Number" name="phone" placeholder="8012345678" value={form.phone ?? ""} onChange={(e) => update("phone", e.target.value)} error={errors.phone} className="sm:col-span-3" required />
              </div>
            </Card>

            {/* Optional */}
            <Card className="p-6 space-y-5">
              <h2 className="text-sm font-bold uppercase tracking-wider text-gold-600">About You (Optional)</h2>
              <div className="grid gap-5 sm:grid-cols-2">
                <Select label="Age Range" name="ageRange" options={AGE_RANGES} placeholder="Select age range" value={form.ageRange ?? ""} onChange={(e) => update("ageRange", e.target.value as Participant["ageRange"])} error={errors.ageRange} />
                <Select label="Current Status" name="currentStatus" options={STATUS_OPTIONS} placeholder="Select status" value={form.currentStatus ?? ""} onChange={(e) => update("currentStatus", e.target.value as Participant["currentStatus"])} error={errors.currentStatus} />
                <Select label="Highest Education" name="educationLevel" options={EDUCATION_OPTIONS} placeholder="Select level" value={form.educationLevel ?? ""} onChange={(e) => update("educationLevel", e.target.value as Participant["educationLevel"])} error={errors.educationLevel} />
                <Select label="Primary Goal" name="primaryGoal" options={GOAL_OPTIONS} placeholder="Select goal" value={form.primaryGoal ?? ""} onChange={(e) => update("primaryGoal", e.target.value as Participant["primaryGoal"])} error={errors.primaryGoal} />
              </div>
            </Card>

            {/* Consent */}
            <div className="space-y-3">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.consent ?? false}
                  onChange={(e) => update("consent", e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-line-strong text-royal-700 focus:ring-royal-100"
                />
                <span className="text-sm text-muted">
                  By continuing, you agree that K4I may use the information you provide to generate and deliver your assessment results.
                </span>
              </label>
              {errors.consent && <p role="alert" className="text-xs font-medium text-red-600">{errors.consent}</p>}
            </div>

            <Button type="submit" variant="primary" size="lg" className="w-full" disabled={submitting}>
              {submitting ? "Starting..." : "Start Assessment"}
            </Button>
          </form>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}