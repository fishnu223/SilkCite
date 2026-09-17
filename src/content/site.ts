/**
 * All marketing content for the SilkCite landing page.
 *
 * Every number shown to visitors is ILLUSTRATIVE and labelled as such. None of
 * these are real SilkCite client results.
 */

export const ECOSYSTEMS = [
  { name: "DeepSeek", tagline: "AI search & answers", logo: "deepseek.webp" },
  { name: "Qwen", tagline: "Alibaba AI ecosystem", logo: "qwen.webp" },
  { name: "Kimi", tagline: "AI search & answers", logo: "kimi.webp" },
  { name: "Doubao", tagline: "ByteDance AI assistant", logo: "doubao.webp" },
  { name: "Baidu", tagline: "Chinese search & AI ecosystem", logo: "baidu.webp" },
] as const;

/** Total AI & search sources SilkCite measures, and the ones beyond the five above. */
export const TOTAL_SOURCES = 16;
export const MORE_SOURCES = TOTAL_SOURCES - ECOSYSTEMS.length;

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export const STATS: Stat[] = [
  { value: 16, suffix: "", label: "AI & search sources monitored" },
  { value: 188, suffix: "", label: "Citations analyzed" },
  { value: 47, suffix: "%", label: "Category queries with no brand mention" },
  { value: 3, suffix: "×", label: "Competitor mentions vs. target brand" },
];

export const MEASURES = [
  {
    title: "AI Discovery",
    question: "Does Chinese AI mention your brand?",
    detail:
      "Measure how frequently the brand appears when consumers ask broad category questions.",
  },
  {
    title: "Recommendation",
    question: "Does AI actually recommend you?",
    detail:
      "Measure whether the brand is included among recommended products or companies.",
  },
  {
    title: "Product Recognition",
    question: "Does AI understand what you sell?",
    detail:
      "Determine whether AI correctly recognizes the brand's products and their category.",
  },
  {
    title: "Entity Accuracy",
    question: "Does AI understand who you are?",
    detail:
      "Measure whether AI correctly connects the company, products, positioning, and market.",
  },
  {
    title: "Citation",
    question: "What sources influence the answer?",
    detail:
      "Identify the sources AI relies on when describing or recommending a brand.",
  },
  {
    title: "Competitor Visibility",
    question: "Who appears instead?",
    detail:
      "Compare the brand's visibility with competing companies in the same category.",
  },
] as const;

export const STEPS = [
  {
    num: "01",
    title: "ASK",
    detail: "Test realistic consumer questions related to the brand's category.",
  },
  {
    num: "02",
    title: "MEASURE",
    detail:
      "Measure mentions, recommendations, citations, competitors, products, and source influence.",
  },
  {
    num: "03",
    title: "REPORT",
    detail:
      "Turn the findings into a clear AI visibility analysis and actionable opportunities.",
  },
] as const;

export const REPORT_METRICS = [
  { label: "Mention Rate", value: 18, suffix: "%" },
  { label: "Recommendation Rate", value: 7, suffix: "%" },
  { label: "Citation Rate", value: 12, suffix: "%" },
  { label: "Competitor Share", value: 64, suffix: "%" },
  { label: "Entity Accuracy", value: 91, suffix: "%" },
  { label: "Source Coverage", value: 38, suffix: "%" },
] as const;

/** Simulated DeepSeek-style answer shown in the hero. */
export const CHAT = {
  model: "DeepSeek",
  query: "What are the best probiotic brands for daily gut health?",
  intro:
    "Based on recent product and review data, these brands are most frequently recommended for daily gut health:",
  brands: [
    { rank: 1, name: "Example Health", yours: true },
    { rank: 2, name: "NovaBiotic", yours: false },
    { rank: 3, name: "Culture & Co", yours: false },
    { rank: 4, name: "FloraForm", yours: false },
  ],
  indicators: [
    { label: "Mentioned", value: "Yes" },
    { label: "Recommended", value: "Yes" },
    { label: "Position", value: "#1" },
    { label: "Cited", value: "Yes" },
    { label: "Sources", value: "14" },
  ],
} as const;
