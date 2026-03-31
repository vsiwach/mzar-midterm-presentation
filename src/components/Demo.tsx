import { useState, useEffect } from "react";
import { csvRows, sampleBLUF, sampleDirectional, evalScorecard, plannerSummary, pipelineStages } from "../data/sampleData";

function StageCard({ stage, isActive, isDone }: { stage: typeof pipelineStages[0]; isActive: boolean; isDone: boolean }) {
  const bg = isActive ? "#1e3a5f" : isDone ? "#1a2e1a" : "#1e293b";
  const border = isActive ? "#60a5fa" : isDone ? "#34d399" : "#334155";
  return (
    <div
      style={{
        padding: "10px 14px",
        borderRadius: "8px",
        background: bg,
        border: `1px solid ${border}`,
        transition: "all 0.4s",
        opacity: isDone || isActive ? 1 : 0.5,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontWeight: 600, fontSize: "0.85rem", color: isActive ? "#60a5fa" : isDone ? "#34d399" : "#64748b" }}>
          Stage {stage.id}: {stage.name}
        </span>
        <span style={{ fontSize: "0.7rem", color: "#64748b" }}>{stage.agent}</span>
      </div>
      <p style={{ fontSize: "0.75rem", color: "#94a3b8", margin: "4px 0 0" }}>{stage.desc}</p>
      {isDone && <span style={{ fontSize: "0.7rem", color: "#34d399" }}>Done</span>}
      {isActive && <span style={{ fontSize: "0.7rem", color: "#60a5fa" }}>Running...</span>}
    </div>
  );
}

export default function Demo() {
  const [activeStage, setActiveStage] = useState(-1);
  const [running, setRunning] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [showEval, setShowEval] = useState(false);

  useEffect(() => {
    if (!running) return;
    if (activeStage >= pipelineStages.length) {
      setShowReport(true);
      setTimeout(() => setShowEval(true), 600);
      setRunning(false);
      return;
    }
    const timer = setTimeout(() => setActiveStage((s) => s + 1), 700);
    return () => clearTimeout(timer);
  }, [activeStage, running]);

  const handleRun = () => {
    setActiveStage(0);
    setRunning(true);
    setShowReport(false);
    setShowEval(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0f172a", color: "#e2e8f0", padding: "24px 32px" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div>
          <h2 style={{ margin: 0, fontSize: "1.4rem" }}>Pipeline Demo</h2>
          <p style={{ color: "#64748b", fontSize: "0.85rem", margin: "4px 0 0" }}>
            DEU Power Daily Market Moves — 2026-01-23 (hardcoded static data)
          </p>
        </div>
        <button
          onClick={handleRun}
          disabled={running}
          style={{
            padding: "10px 24px",
            borderRadius: "8px",
            border: "none",
            background: running ? "#334155" : "#2563eb",
            color: running ? "#64748b" : "#fff",
            fontWeight: 600,
            fontSize: "0.9rem",
            cursor: running ? "default" : "pointer",
          }}
        >
          {running ? "Running..." : activeStage >= 0 ? "Re-run Pipeline" : "Run Pipeline"}
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: "24px" }}>
        {/* Left: Input + Pipeline Stages */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Input CSV */}
          <div style={{ background: "#1e293b", borderRadius: "12px", padding: "16px", border: "1px solid #334155" }}>
            <h3 style={{ margin: "0 0 12px", fontSize: "0.9rem", color: "#60a5fa" }}>Input CSV (6 of 577 rows)</h3>
            <table style={{ width: "100%", fontSize: "0.7rem", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ color: "#64748b" }}>
                  <th style={{ textAlign: "left", padding: "4px 6px", borderBottom: "1px solid #334155" }}>Contract</th>
                  <th style={{ textAlign: "right", padding: "4px 6px", borderBottom: "1px solid #334155" }}>Z-Score</th>
                </tr>
              </thead>
              <tbody>
                {csvRows.map((row) => (
                  <tr key={row.contract}>
                    <td style={{ padding: "4px 6px", color: "#cbd5e1", borderBottom: "1px solid #1e293b" }}>
                      {row.contract}
                    </td>
                    <td
                      style={{
                        padding: "4px 6px",
                        textAlign: "right",
                        color: row.value < 0 ? "#f87171" : "#34d399",
                        fontFamily: "monospace",
                        fontWeight: 600,
                        borderBottom: "1px solid #1e293b",
                      }}
                    >
                      {row.value > 0 ? "+" : ""}
                      {row.value.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pipeline Stages */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <h3 style={{ margin: "0 0 4px", fontSize: "0.9rem", color: "#a78bfa" }}>Pipeline Stages</h3>
            {pipelineStages.map((stage, i) => (
              <StageCard
                key={stage.id}
                stage={stage}
                isActive={i === activeStage}
                isDone={i < activeStage}
              />
            ))}
          </div>
        </div>

        {/* Right: Output */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Expert Evaluator Instructions */}
          <div
            style={{
              background: "#111827",
              borderRadius: "12px",
              padding: "20px",
              border: "1px solid #334155",
              animation: "fadeIn 0.5s ease-in",
              marginBottom: "16px",
            }}
          >
            <h3 style={{ margin: "0 0 8px", fontSize: "0.9rem", color: "#34d399" }}>Expert Evaluator</h3>
            <p style={{ color: "#94a3b8", fontSize: "0.8rem", margin: 0, lineHeight: 1.6 }}>
              You are evaluating AI-generated energy market reports using structured agent_results from Agents 1–5. Base each score on the individual check details and severities, avoid double-penalizing downstream failures, and assign 0–2 points per agent.
            </p>
            <div style={{ display: "flex", gap: "12px", overflowX: "auto", paddingTop: "12px" }}>
              {[
                {
                  title: "Agent 3",
                  stage: "Stages 0-3",
                  label: "Data Checks",
                  items: ["Verify CSV format", "Normalize records", "Rank top moves", "Collect evidence"],
                  note: "Fast, local checks",
                },
                {
                  title: "Agent 4",
                  stage: "Stages 5-9",
                  label: "Report Writing",
                  items: ["Plan each section", "Write four drafts", "Merge into one report", "Run a quality gate"],
                  note: "Generates clean output",
                },
                {
                  title: "Agents 1+2+5",
                  stage: "Stage 10",
                  label: "Rule Review",
                  items: ["Check numbers", "Check section order", "Check market focus", "Check direction language"],
                  note: "Uses clear pass/fail rules",
                },
                {
                  title: "Agent 6",
                  stage: "Stage 11",
                  label: "Final Judge",
                  items: ["Score the report", "Weigh issues fairly", "Avoid repeat penalties", "Give a final quality mark"],
                  note: "A final review step",
                },
              ].map((step, idx) => (
                <div key={step.title} style={{ minWidth: "220px", background: "#0f172a", border: "1px solid #334155", borderRadius: "12px", padding: "14px", flexShrink: 0, position: "relative" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px" }}>
                    <span style={{ fontSize: "0.75rem", color: "#94a3b8", fontWeight: 700 }}>{step.title}</span>
                    <span style={{ fontSize: "0.7rem", color: "#64748b" }}>{step.stage}</span>
                  </div>
                  <h4 style={{ margin: "10px 0 8px", fontSize: "0.95rem", color: "#e2e8f0" }}>{step.label}</h4>
                  <p style={{ margin: "8px 0 0", fontSize: "0.75rem", color: "#cbd5e1", lineHeight: 1.4 }}>{step.note}</p>
                  {idx < 3 && (
                    <div style={{ position: "absolute", right: "-20px", top: "50%", transform: "translateY(-50%)", color: "#64748b", fontSize: "1.1rem" }}>→</div>
                  )}
                </div>
              ))}
            </div>
          </div>

        {/* Planner Output */}
          {activeStage >= 4 && (
            <div
              style={{
                background: "#1e293b",
                borderRadius: "12px",
                padding: "20px",
                border: "1px solid #a78bfa33",
                animation: "fadeIn 0.5s ease-in",
              }}
            >
              <h3 style={{ margin: "0 0 8px", fontSize: "0.9rem", color: "#a78bfa" }}>Planner Output</h3>
              <p style={{ color: "#94a3b8", fontSize: "0.8rem", margin: 0, lineHeight: 1.6 }}>{plannerSummary}</p>
            </div>
          )}

          {/* Report Output */}
          {showReport && (
            <div
              style={{
                background: "#1e293b",
                borderRadius: "12px",
                padding: "24px",
                border: "1px solid #334155",
                animation: "fadeIn 0.5s ease-in",
                maxHeight: "400px",
                overflowY: "auto",
              }}
            >
              <h3 style={{ margin: "0 0 4px", fontSize: "1.1rem", color: "#f1f5f9" }}>
                DEU Power Daily Market Moves
              </h3>
              <p style={{ color: "#64748b", fontSize: "0.8rem", margin: "0 0 16px" }}>Reference Date: 2026-01-23</p>

              <div style={{ background: "#0f172a", borderRadius: "8px", padding: "16px", marginBottom: "16px" }}>
                <h4 style={{ color: "#60a5fa", fontSize: "0.85rem", margin: "0 0 8px" }}>BLUF</h4>
                <p style={{ color: "#cbd5e1", fontSize: "0.85rem", margin: 0, lineHeight: 1.6 }}>
                  The session's three most significant moves by z-score were:{" "}
                  <strong style={{ color: "#f87171" }}>DEU DA20260126</strong> moved sharply lower (z = -13.10);{" "}
                  <strong style={{ color: "#f87171" }}>EUA MM26</strong> moved sharply lower (z = -10.43);{" "}
                  <strong style={{ color: "#34d399" }}>TTF MN26</strong> moved sharply higher (z = +9.07).
                </p>
              </div>

              <h4 style={{ color: "#e2e8f0", fontSize: "0.9rem", margin: "0 0 12px" }}>Directional Moves</h4>
              {[
                { name: "DEU DA20260126", dir: "Bearish", z: -13.1, desc: "German Day-Ahead. Extreme negative z-score: outsized single-session repricing." },
                { name: "EUA MM26", dir: "Bearish", z: -10.43, desc: "EU Carbon. Aligned with DEU sell-off via fuel-switch PCA framework." },
                { name: "TTF MN26", dir: "Bullish", z: 9.07, desc: "TTF Gas. Counter-directional to EUA, consistent with PC2 loading structure." },
              ].map((item) => (
                <div
                  key={item.name}
                  style={{
                    padding: "12px",
                    marginBottom: "8px",
                    background: "#0f172a",
                    borderRadius: "8px",
                    borderLeft: `3px solid ${item.z < 0 ? "#f87171" : "#34d399"}`,
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontWeight: 600, color: "#e2e8f0", fontSize: "0.85rem" }}>{item.name}</span>
                    <span style={{ color: item.z < 0 ? "#f87171" : "#34d399", fontFamily: "monospace", fontSize: "0.85rem" }}>
                      {item.dir} | z = {item.z > 0 ? "+" : ""}{item.z.toFixed(2)}
                    </span>
                  </div>
                  <p style={{ color: "#94a3b8", fontSize: "0.8rem", margin: "4px 0 0" }}>{item.desc}</p>
                </div>
              ))}

              <div style={{ marginTop: "16px", padding: "12px", background: "#1a1a0f", borderRadius: "8px", border: "1px solid #f59e0b33" }}>
                <p style={{ color: "#fbbf24", fontSize: "0.75rem", margin: 0 }}>
                  Data gaps: Absolute and % change values absent from task payload. Writers must populate from source CSV before publication. No API2 contract in top movers.
                </p>
              </div>
            </div>
          )}

          {/* Eval Scorecard */}
          {showEval && (
            <div
              style={{
                background: "#1e293b",
                borderRadius: "12px",
                padding: "20px",
                border: "1px solid #34d39933",
                animation: "fadeIn 0.5s ease-in",
              }}
            >
              <h3 style={{ margin: "0 0 12px", fontSize: "0.9rem", color: "#34d399" }}>
                Eval Scorecard (Stage 10)
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                {evalScorecard.map((rule) => (
                  <div
                    key={rule.rule}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "8px 12px",
                      background: "#0f172a",
                      borderRadius: "6px",
                    }}
                  >
                    <span style={{ color: "#cbd5e1", fontSize: "0.8rem" }}>{rule.rule}</span>
                    <span
                      style={{
                        color: rule.status === "pass" ? "#34d399" : "#fbbf24",
                        fontWeight: 600,
                        fontSize: "0.8rem",
                      }}
                    >
                      {rule.status === "pass" ? "PASS" : "WARN"}
                    </span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: "12px", textAlign: "center" }}>
                <span style={{ color: "#34d399", fontWeight: 700, fontSize: "1.1rem" }}>
                  Guardrail: PASS
                </span>
                <span style={{ color: "#64748b", fontSize: "0.8rem", marginLeft: "12px" }}>
                  0 issues, 0 revision instructions
                </span>
              </div>
            </div>
          )}

          {/* Placeholder */}
          {activeStage < 0 && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "400px",
                background: "#1e293b",
                borderRadius: "12px",
                border: "1px dashed #334155",
              }}
            >
              <p style={{ color: "#475569", fontSize: "1rem" }}>Click "Run Pipeline" to see the demo</p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
