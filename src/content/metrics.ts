/**
 * Sample analytics data shown on the public site.
 *
 * IMPORTANT — DATA INTEGRITY: these are ILLUSTRATIVE values only. They are not
 * real SilkCite client results and must always be rendered alongside the
 * "Sample analysis — not live data" label. When real data is wired in, the UI
 * must clearly distinguish live data from demonstration data.
 */

export interface StatMetric {
  id: string;
  label: string;
  value: number;
  decimals: number;
  suffix: string;
  description: string;
}

export const CORE_METRICS: StatMetric[] = [
  {
    id: "mention-rate",
    label: "Mention Rate",
    value: 68,
    decimals: 0,
    suffix: "%",
    description: "How often AI mentions the brand in relevant category searches.",
  },
  {
    id: "recommendation-rate",
    label: "Recommendation Rate",
    value: 42,
    decimals: 0,
    suffix: "%",
    description: "How often AI recommends the brand when asked.",
  },
  {
    id: "citation-rate",
    label: "Citation Rate",
    value: 31,
    decimals: 0,
    suffix: "%",
    description: "How often recommendations are supported by a citable source.",
  },
  {
    id: "competitor-share",
    label: "Competitor Share",
    value: 2.4,
    decimals: 1,
    suffix: "×",
    description: "How frequently competitors appear relative to the target brand.",
  },
  {
    id: "entity-accuracy",
    label: "Entity Accuracy",
    value: 87,
    decimals: 0,
    suffix: "%",
    description: "How accurately AI understands the brand and its products.",
  },
  {
    id: "source-coverage",
    label: "Source Coverage",
    value: 54,
    decimals: 0,
    suffix: "%",
    description: "How broadly authoritative sources support the brand's presence.",
  },
];

export const SECONDARY_METRICS: StatMetric[] = [
  {
    id: "answer-consistency",
    label: "Answer Consistency",
    value: 76,
    decimals: 0,
    suffix: "%",
    description: "How stable the brand's representation is across repeated queries.",
  },
  {
    id: "sentiment-balance",
    label: "Sentiment Balance",
    value: 64,
    decimals: 0,
    suffix: "%",
    description: "Share of brand mentions with a positive or neutral tone.",
  },
  {
    id: "prompt-coverage",
    label: "Prompt Coverage",
    value: 48,
    decimals: 0,
    suffix: "%",
    description: "Share of common buyer prompts where the brand appears.",
  },
  {
    id: "entity-freshness",
    label: "Entity Freshness",
    value: 73,
    decimals: 0,
    suffix: "%",
    description: "How current the AI's understanding of the brand is.",
  },
];

export interface ShareBar {
  id: string;
  label: string;
  /** Percentage share (0–100). */
  value: number;
  accent: boolean;
}

/** Centerpiece: share of AI mentions across a sample category query set. */
export const SHARE_CHART: { title: string; bars: ShareBar[] } = {
  title: "Share of AI mentions — sample category query set",
  bars: [
    { id: "competitor-a", label: "Competitor A", value: 34, accent: false },
    { id: "competitor-b", label: "Competitor B", value: 27, accent: false },
    { id: "competitor-c", label: "Competitor C", value: 21, accent: false },
    { id: "your-brand", label: "Your brand", value: 18, accent: true },
  ],
};

export const SAMPLE_DATA_LABEL = "Sample analysis — not live data";
