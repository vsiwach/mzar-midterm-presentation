// Hardcoded data from actual pipeline output (run_010, 2026-01-23)
// Source: sample_output/sample_report_deu_power_2026-01-23.md

export const csvRows = [
  { contract: "DEU DA20260126", region: "DEU", valueType: "Zscore", value: -13.10, tenor: "Day-Ahead (Mon 26 Jan)" },
  { contract: "EUA MM26", region: "EUA", valueType: "Zscore", value: -10.43, tenor: "Monthly (Mar 2026)" },
  { contract: "TTF MN26", region: "TTF", valueType: "Zscore", value: 9.07, tenor: "Monthly (Jan 2026)" },
  { contract: "DEU/FRA MK26", region: "DEU/FRA", valueType: "Zscore", value: -7.24, tenor: "Location Spread (May 2026)" },
  { contract: "NBP/TTF MJ26", region: "NBP/TTF", valueType: "Zscore", value: -6.90, tenor: "Location Spread (Jun 2026)" },
  { contract: "CSS_FRA/YZ26", region: "CSS", valueType: "Zscore", value: -5.11, tenor: "Fuel Spread (Cal 2026)" },
];

export const sampleBLUF = `The session's three most significant moves by z-score were: **DEU DA20260126** moved sharply lower (z = -13.10); **EUA MM26** moved sharply lower (z = -10.43); **TTF MN26** moved sharply higher (z = +9.07).`;

export const sampleDirectional = `### 1. DEU DA20260126 — German Day-Ahead, Delivery 2026-01-26
**Direction:** ↓ Bearish | **Z-Score: -13.10**

The strongest move in today's dataset by a wide margin. The extreme negative z-score suggests an outsized single-session repricing relative to the historical distribution of this tenor.

### 2. EUA MM26 — EU Carbon Allowances, March 2026 Monthly
**Direction:** ↓ Bearish | **Z-Score: -10.43**

Directional alignment with DEU DA: a sharp EUA sell-off reduces the marginal cost penalty on coal-fired generation relative to gas, consistent with the fuel-switch PCA framework.

### 3. TTF MN26 — TTF Natural Gas, January 2026 Monthly
**Direction:** ↑ Bullish | **Z-Score: +9.07**

The sole upside mover. Counter-directional to EUA (carbon down, gas up) is consistent with fuel-switch PC2 loading structure.`;

export const evalScorecard = [
  { rule: "Section Order", status: "pass" as const, detail: "All 4 required sections in correct order" },
  { rule: "Market Priority", status: "pass" as const, detail: "Primary markets (DEU, EUA, TTF) before secondary" },
  { rule: "Required Sections", status: "pass" as const, detail: "BLUF + Directional + Relative Value + Fuel Spreads" },
  { rule: "Numeric Transcription", status: "pass" as const, detail: "Z-scores match source CSV within +/-0.05" },
  { rule: "Direction Match", status: "pass" as const, detail: "'lower' aligns with negative z, 'higher' with positive" },
  { rule: "BLUF Coverage", status: "pass" as const, detail: "Top-3 primary movers by |z| appear in BLUF" },
  { rule: "Magnitude Language", status: "warning" as const, detail: "'sharply' used for |z| > 0.5 (advisory)" },
  { rule: "Holistic Quality Score", status: "pass" as const, detail: "LLM judge target met with score above 7.5/10" },
];

export const plannerSummary = `Three primary-market contracts dominate the snapshot by absolute Z-score: DEU DA20260126 (z = -13.10), EUA MM26 (z = -10.43), and TTF MN26 (z = +9.07). The four mandatory sections must be written in strict guidance order. All numeric claims must trace to source data within +/-0.05 units or +/-2%. The evidence pack for EUA and TTF causal drivers is weak — writers must flag explicitly rather than invent.`;

export const pipelineStages = [
  { id: 0, name: "CSV Schema", agent: "Agent 3", desc: "Validate 11-col format, single date, float values", status: "done" as const },
  { id: 1, name: "Adapter", agent: "Agent 3", desc: "Pivot CSV -> 115 records, classify categories, rank z-scores", status: "done" as const },
  { id: 2, name: "SourceBundle", agent: "Agent 3", desc: "Wrap into dataclass, compact top-12 focus records", status: "done" as const },
  { id: 3, name: "EvidencePack", agent: "Agent 3", desc: "Generate 9 retrieval queries, route to vector stores", status: "done" as const },
  { id: 5, name: "Planner", agent: "Agent 4", desc: "BAM Assistant -> JSON plan with writer payloads per section", status: "done" as const },
  { id: 6, name: "Writers (x4)", agent: "Agent 4", desc: "4 parallel writers: Directional, RelVal, Fuels, Context", status: "done" as const },
  { id: 7, name: "Editor", agent: "Agent 4", desc: "Synthesize drafts, strip artifacts, merge BLUF", status: "done" as const },
  { id: 8, name: "Guardrail", agent: "Agent 4", desc: "Quality gate: pass/revise with revision instructions", status: "done" as const },
  { id: 9, name: "Renderer", agent: "Agent 4", desc: "Add title, reference date, footer -> final markdown", status: "done" as const },
  { id: 10, name: "Eval", agent: "Agents 1+2+5", desc: "Section order, market priority, numeric check, direction match", status: "done" as const },
  { id: 11, name: "Judge", agent: "Agent 6", desc: "Holistic meta-score across all agents, severity-aware quality judgement", status: "done" as const },
];
