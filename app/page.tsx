import { SiteHeader } from "@/components/navigation/SiteHeader";
import { SiteFooter } from "@/components/navigation/SiteFooter";
import { Hero } from "@/components/landing/Hero";
import { TrustStrip } from "@/components/landing/TrustStrip";
import { WhySection } from "@/components/landing/CapabilityCards";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { AssessmentPreview } from "@/components/landing/AssessmentPreview";
import { CoursesPreview } from "@/components/landing/CoursesPreview";
import { AudienceSection } from "@/components/landing/AudienceSection";
import { PhilosophySection } from "@/components/landing/PhilosophySection";
import { FinalCTA } from "@/components/landing/FinalCTA";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <TrustStrip />
        <WhySection />
        <HowItWorks />
        <CoursesPreview />
        <AssessmentPreview />
        <AudienceSection />
        <PhilosophySection />
        <FinalCTA>
          <SiteFooter dark />
        </FinalCTA>
      </main>
    </>
  );
}