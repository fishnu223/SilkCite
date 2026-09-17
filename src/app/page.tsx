import { BigStatement } from "@/components/BigStatement";
import { EcosystemSection } from "@/components/EcosystemSection";
import { FinalCTA } from "@/components/FinalCTA";
import { GlobalVisibility } from "@/components/GlobalVisibility";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { MeasuresSection } from "@/components/MeasuresSection";
import { ReportVisual } from "@/components/ReportVisual";
import { StatsSection } from "@/components/StatsSection";

export default function Page() {
  return (
    <>
      <Hero />
      <EcosystemSection />
      <StatsSection />
      <MeasuresSection />
      <GlobalVisibility />
      <BigStatement />
      <HowItWorks />
      <ReportVisual />
      <FinalCTA />
    </>
  );
}
