import { useState, useEffect, useCallback } from "react";

const slides = [
  // SLIDE 1: The Problem
  {
    title: "The Problem",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
        <p style={{ fontSize: "1.25rem", color: "#e2e8f0", lineHeight: 1.7 }}>
          BAM Funds generates <strong style={{ color: "#60a5fa" }}>daily European energy market reports</strong> using
          3 LLMs (Gemini, GPT-5, Claude) from identical structured CSV data.
        </p>
        <div style={{ background: "#1e293b", borderRadius: "12px", padding: "24px", border: "1px solid #334155" }}>
          <p style={{ fontSize: "1.1rem", color: "#f87171", fontWeight: 600, marginBottom: "16px" }}>
            ~88% numeric accuracy sounds good, but subtle failures slip through:
          </p>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
            {[
              ["Section ordering violations", "Models rearrange required market sequences (Power, Gas, Carbon, Coal)"],
              ["Fabricated causal reasoning", "Models invent plausible explanations unsupported by provided data"],
              ["Liquidity filter failures", "Illiquid products (sub-$2M daily volume) included despite instructions"],
              ["Missing required subsections", "Forward curve analysis, spread commentary omitted"],
            ].map(([title, desc]) => (
              <li key={title} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                <span style={{ color: "#f87171", fontSize: "1.2rem", flexShrink: 0 }}>x</span>
                <span style={{ color: "#cbd5e1" }}>
                  <strong style={{ color: "#e2e8f0" }}>{title}</strong> — {desc}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div style={{ background: "#1e293b", borderRadius: "12px", padding: "20px", borderLeft: "4px solid #f59e0b" }}>
          <p style={{ fontSize: "1.15rem", color: "#fbbf24", margin: 0 }}>
            Human reviewers comparing 3 outputs against detailed prompts is unreliable.
            Time pressure + working memory limits = <strong>instruction compliance failures reach publication</strong>.
          </p>
        </div>
      </div>
    ),
  },
  // SLIDE 2: The Solution
  {
    title: "The Solution",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <p style={{ fontSize: "1.15rem", color: "#e2e8f0", lineHeight: 1.6 }}>
          A simple review pipeline that checks data, writes the report, and scores the final result.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "16px" }}>
          {[
            {
              label: "Agent 3",
              color: "#60a5fa",
              stages: "Stages 0-3",
              title: "Data Checks",
              items: ["Verify CSV format", "Normalize records", "Rank top moves", "Collect evidence"],
              note: "Fast, local checks",
            },
            {
              label: "Agent 4",
              color: "#a78bfa",
              stages: "Stages 5-9",
              title: "Report Writing",
              items: ["Plan each section", "Write four drafts", "Merge into one report", "Run a quality gate"],
              note: "Generates clean output",
            },
            {
              label: "Agents 1+2+5",
              color: "#34d399",
              stages: "Stage 10",
              title: "Rule Review",
              items: ["Check numbers", "Check section order", "Check market focus", "Check direction language"],
              note: "Uses clear pass/fail rules",
            },
            {
              label: "Agent 6",
              color: "#10b981",
              stages: "Stage 11",
              title: "Final Judge",
              items: ["Score the report", "Weigh issues fairly", "Avoid repeat penalties", "Give a final quality mark"],
              note: "A final review step",
            },
          ].map((agent) => (
            <div
              key={agent.label}
              style={{
                background: "#1e293b",
                borderRadius: "12px",
                padding: "20px",
                borderTop: `3px solid ${agent.color}`,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <span style={{ color: agent.color, fontWeight: 700, fontSize: "1rem" }}>{agent.label}</span>
                <span style={{ color: "#64748b", fontSize: "0.8rem" }}>{agent.stages}</span>
              </div>
              <p style={{ color: "#e2e8f0", fontWeight: 600, fontSize: "0.95rem", margin: "4px 0 12px" }}>{agent.title}</p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "6px" }}>
                {agent.items.map((item) => (
                  <li key={item} style={{ color: "#94a3b8", fontSize: "0.85rem" }}>
                    {item}
                  </li>
                ))}
              </ul>
              <p style={{ color: "#64748b", fontSize: "0.75rem", marginTop: "12px", fontStyle: "italic" }}>{agent.note}</p>
            </div>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div style={{ background: "#1e293b", borderRadius: "8px", padding: "16px", border: "1px solid #334155" }}>
            <p style={{ color: "#60a5fa", fontWeight: 600, fontSize: "0.9rem", margin: "0 0 6px" }}>Data Strategy</p>
            <ul style={{ color: "#94a3b8", fontSize: "0.85rem", margin: 0, paddingLeft: "18px", lineHeight: 1.6 }}>
              <li>CSV data is passed inline in prompts; not stored in vector stores</li>
              <li>Synthetic data is used for testing</li>
              <li>Example BAM reports used to guide the output style</li>
              <li>RAG is only used for domain knowledge</li>
            </ul>
          </div>
          <div style={{ background: "#1e293b", borderRadius: "8px", padding: "16px", border: "1px solid #334155" }}>
            <p style={{ color: "#34d399", fontWeight: 600, fontSize: "0.9rem", margin: "0 0 6px" }}>Fallback Safety Net</p>
            <ul style={{ color: "#94a3b8", fontSize: "0.85rem", margin: 0, paddingLeft: "18px", lineHeight: 1.6 }}>
              <li>Planner: generate plan locally from task config, no LLM call</li>
              <li>Editor: concatenate section drafts directly</li>
              <li>Guardrail: rule-based check for required sections and non-empty report</li>
            </ul>
          </div>
        </div>
      </div>
    ),
  },
  // SLIDE 3: Biggest Unsolved Hurdle
  {
    title: "Biggest Unsolved Hurdles",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div style={{ background: "#1e293b", borderRadius: "12px", padding: "24px", borderLeft: "4px solid #f87171" }}>
          <p style={{ color: "#f87171", fontWeight: 700, fontSize: "1.15rem", margin: "0 0 12px" }}>
            Evidence Gaps
          </p>
          <p style={{ color: "#cbd5e1", fontSize: "1rem", margin: 0, lineHeight: 1.6 }}>
            There is still a lot of hallucination on both report generation and evaluation. The system can invent explanations and overstate confidence even when evidence is weak.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div style={{ background: "#1e293b", borderRadius: "12px", padding: "20px", borderLeft: "4px solid #f59e0b" }}>
            <p style={{ color: "#fbbf24", fontWeight: 600, fontSize: "1rem", margin: "0 0 8px" }}>
              Data Organization
            </p>
            <p style={{ color: "#94a3b8", fontSize: "0.9rem", margin: 0 }}>
              Too many supporting CSVs and loose organization may worsen hallucinations.
            </p>
          </div>
          <div style={{ background: "#1e293b", borderRadius: "12px", padding: "20px", borderLeft: "4px solid #f59e0b" }}>
            <p style={{ color: "#fbbf24", fontWeight: 600, fontSize: "1rem", margin: "0 0 8px" }}>
              Data Fragmentation
            </p>
            <p style={{ color: "#94a3b8", fontSize: "0.9rem", margin: 0 }}>
              Many files and loose organization make manual checks time-consuming and error-prone.
            </p>
          </div>
        </div>
        <div style={{ background: "#0f172a", borderRadius: "8px", padding: "16px", border: "1px dashed #334155", textAlign: "center" }}>
          <p style={{ color: "#60a5fa", fontSize: "1rem", margin: 0 }}>
            We'd love feedback on: reducing hallucination in generation and evaluation, especially when supporting data is fragmented and manual checks are costly.
          </p>
        </div>
      </div>
    ),
  },
];

export default function Presentation() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const goNext = useCallback(() => setCurrentSlide((s) => Math.min(s + 1, slides.length - 1)), []);
  const goPrev = useCallback(() => setCurrentSlide((s) => Math.max(s - 1, 0)), []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") goNext();
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goNext, goPrev]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "#e2e8f0",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "24px 48px 16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #1e293b",
        }}
      >
        <div>
          <h1 style={{ margin: 0, fontSize: "1.5rem", fontWeight: 700, color: "#f1f5f9" }}>
            MZAR x BAM Funds
          </h1>
          <p style={{ margin: "4px 0 0", color: "#64748b", fontSize: "0.85rem" }}>
            GenAI Lab — MIT Sloan | Spring 2026
          </p>
        </div>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              style={{
                width: i === currentSlide ? "32px" : "10px",
                height: "10px",
                borderRadius: "5px",
                border: "none",
                background: i === currentSlide ? "#60a5fa" : "#334155",
                cursor: "pointer",
                transition: "all 0.3s",
              }}
            />
          ))}
          <span style={{ color: "#64748b", fontSize: "0.8rem", marginLeft: "12px" }}>
            {currentSlide + 1} / {slides.length}
          </span>
        </div>
      </div>

      {/* Slide Content */}
      <div style={{ flex: 1, padding: "40px 48px", maxWidth: "1100px", margin: "0 auto", width: "100%" }}>
        <h2
          style={{
            fontSize: "2rem",
            fontWeight: 700,
            marginBottom: "32px",
            color: "#f1f5f9",
          }}
        >
          {slides[currentSlide].title}
        </h2>
        {slides[currentSlide].content}
      </div>

      {/* Footer Nav */}
      <div
        style={{
          padding: "16px 48px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid #1e293b",
        }}
      >
        <button
          onClick={goPrev}
          disabled={currentSlide === 0}
          style={{
            padding: "8px 20px",
            borderRadius: "6px",
            border: "1px solid #334155",
            background: currentSlide === 0 ? "#0f172a" : "#1e293b",
            color: currentSlide === 0 ? "#334155" : "#e2e8f0",
            cursor: currentSlide === 0 ? "default" : "pointer",
            fontSize: "0.9rem",
          }}
        >
          Previous
        </button>
        <span style={{ color: "#475569", fontSize: "0.8rem" }}>Use arrow keys to navigate</span>
        <button
          onClick={goNext}
          disabled={currentSlide === slides.length - 1}
          style={{
            padding: "8px 20px",
            borderRadius: "6px",
            border: "1px solid #334155",
            background: currentSlide === slides.length - 1 ? "#0f172a" : "#1e293b",
            color: currentSlide === slides.length - 1 ? "#334155" : "#e2e8f0",
            cursor: currentSlide === slides.length - 1 ? "default" : "pointer",
            fontSize: "0.9rem",
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
