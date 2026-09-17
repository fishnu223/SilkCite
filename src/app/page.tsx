import { AdditionalMetrics } from "@/components/AdditionalMetrics";
import { Explanation } from "@/components/Explanation";
import { FinalCTA } from "@/components/FinalCTA";
import { Hero } from "@/components/Hero";
import { SecondaryMessage } from "@/components/SecondaryMessage";
import { StatsSection } from "@/components/StatsSection";

export default function Page() {
  return (
    <>
      <Hero />
      <StatsSection />
      <SecondaryMessage />
      <Explanation />
      <AdditionalMetrics />
      <FinalCTA />
    </>
  );
}
