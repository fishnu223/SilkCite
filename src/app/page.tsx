import { headers } from "next/headers";
import { AdditionalMetrics } from "@/components/AdditionalMetrics";
import { Explanation } from "@/components/Explanation";
import { FinalCTA } from "@/components/FinalCTA";
import { Hero } from "@/components/Hero";
import { SecondaryMessage } from "@/components/SecondaryMessage";
import { StatsSection } from "@/components/StatsSection";
import { serverEnv } from "@/lib/env";
import { isTurnstileEnabled } from "@/lib/turnstile";

export default async function Page() {
  const nonce = (await headers()).get("x-nonce") ?? undefined;

  return (
    <>
      <Hero calendlyUrl={serverEnv.calendlyUrl} />
      <StatsSection />
      <SecondaryMessage />
      <Explanation />
      <AdditionalMetrics />
      <FinalCTA
        calendlyUrl={serverEnv.calendlyUrl}
        turnstileSiteKey={
          isTurnstileEnabled() ? serverEnv.turnstileSiteKey : undefined
        }
        nonce={nonce}
      />
    </>
  );
}
