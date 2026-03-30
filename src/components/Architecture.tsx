export default function Architecture() {
  return (
    <div style={{ minHeight: "100vh", background: "#0f172a", color: "#e2e8f0", padding: "24px 32px" }}>
      <h2 style={{ fontSize: "1.4rem", margin: "0 0 24px" }}>System Architecture</h2>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
        {/* Left: Block Diagram */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* CSV Input */}
          <div style={{ background: "#1e293b", borderRadius: "8px", padding: "14px 18px", border: "1px solid #60a5fa", textAlign: "center" }}>
            <span style={{ color: "#60a5fa", fontWeight: 700, fontSize: "0.95rem" }}>CSV Input</span>
            <p style={{ color: "#64748b", fontSize: "0.75rem", margin: "4px 0 0" }}>577 rows, 11 columns, BAM format</p>
          </div>

          <div style={{ textAlign: "center", color: "#475569" }}>|</div>

          {/* Agent 3 Block */}
          <div style={{ background: "#172554", borderRadius: "12px", padding: "16px", border: "1px solid #1d4ed8" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ color: "#60a5fa", fontWeight: 700 }}>Agent 3: Transformation</span>
              <span style={{ color: "#475569", fontSize: "0.75rem" }}>Stages 0-3 | Pure Python</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "6px" }}>
              {["Schema", "Adapter", "Bundle", "Evidence"].map((s) => (
                <div key={s} style={{ background: "#1e3a5f", borderRadius: "6px", padding: "6px", textAlign: "center", fontSize: "0.75rem", color: "#93c5fd" }}>
                  {s}
                </div>
              ))}
            </div>
          </div>

          <div style={{ textAlign: "center", color: "#475569" }}>|</div>

          {/* RAG Stores */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
            <div style={{ background: "#1a1a2e", borderRadius: "8px", padding: "10px", border: "1px solid #6366f1", textAlign: "center" }}>
              <span style={{ color: "#818cf8", fontWeight: 600, fontSize: "0.8rem" }}>VS: Report Guidance</span>
              <p style={{ color: "#64748b", fontSize: "0.65rem", margin: "2px 0 0" }}>Editorial rules, style guide</p>
            </div>
            <div style={{ background: "#1a1a2e", borderRadius: "8px", padding: "10px", border: "1px solid #6366f1", textAlign: "center" }}>
              <span style={{ color: "#818cf8", fontWeight: 600, fontSize: "0.8rem" }}>VS: Power Reference</span>
              <p style={{ color: "#64748b", fontSize: "0.65rem", margin: "2px 0 0" }}>132 files: models, fuel-switch, RICs</p>
            </div>
          </div>

          <div style={{ textAlign: "center", color: "#475569" }}>|</div>

          {/* Agent 4 Block */}
          <div style={{ background: "#1e1b4b", borderRadius: "12px", padding: "16px", border: "1px solid #7c3aed" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ color: "#a78bfa", fontWeight: 700 }}>Agent 4: Report Generation</span>
              <span style={{ color: "#475569", fontSize: "0.75rem" }}>Stages 5-9 | BAM API</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "4px" }}>
                <div style={{ background: "#2d2260", borderRadius: "6px", padding: "6px 10px", fontSize: "0.75rem", color: "#c4b5fd", textAlign: "center" }}>
                  {"Planner \u2192 JSON plan with writer payloads"}
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "4px" }}>
                {["Directional", "RelVal", "Fuels", "Context"].map((w) => (
                  <div key={w} style={{ background: "#2d2260", borderRadius: "6px", padding: "6px", textAlign: "center", fontSize: "0.7rem", color: "#c4b5fd" }}>
                    {w}
                  </div>
                ))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "4px" }}>
                {["Editor", "Guardrail", "Renderer"].map((s) => (
                  <div key={s} style={{ background: "#2d2260", borderRadius: "6px", padding: "6px", textAlign: "center", fontSize: "0.75rem", color: "#c4b5fd" }}>
                    {s}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ textAlign: "center", color: "#475569" }}>|</div>

          {/* Agent 1+2+5 Block */}
          <div style={{ background: "#052e16", borderRadius: "12px", padding: "16px", border: "1px solid #16a34a" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ color: "#34d399", fontWeight: 700 }}>Agents 1+2+5: Evaluation</span>
              <span style={{ color: "#475569", fontSize: "0.75rem" }}>Stage 10 | Pure Python</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "6px" }}>
              {["Numeric Check", "Section Order", "Direction Match"].map((s) => (
                <div key={s} style={{ background: "#14532d", borderRadius: "6px", padding: "6px", textAlign: "center", fontSize: "0.7rem", color: "#86efac" }}>
                  {s}
                </div>
              ))}
            </div>
          </div>

          <div style={{ textAlign: "center", color: "#475569" }}>|</div>

          {/* Agent 6 Block */}
          <div style={{ background: "#111827", borderRadius: "12px", padding: "16px", border: "1px solid #10b981" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ color: "#34d399", fontWeight: 700 }}>Agent 6: Quality Judge</span>
              <span style={{ color: "#475569", fontSize: "0.75rem" }}>Stage 10 | Holistic score</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "6px" }}>
              {[
                "Scores agents 3-5 with severity-aware reasoning",
                "Avoids double-penalizing downstream failures",
                "Total score target: 7.5/10",
              ].map((s) => (
                <div key={s} style={{ background: "#0f2f1d", borderRadius: "6px", padding: "6px", textAlign: "center", fontSize: "0.7rem", color: "#86efac" }}>
                  {s}
                </div>
              ))}
            </div>
          </div>

          <div style={{ textAlign: "center", color: "#475569" }}>|</div>

          {/* Output */}
          <div style={{ background: "#1e293b", borderRadius: "8px", padding: "14px 18px", border: "1px solid #34d399", textAlign: "center" }}>
            <span style={{ color: "#34d399", fontWeight: 700, fontSize: "0.95rem" }}>Final Report + Scorecard</span>
            <p style={{ color: "#64748b", fontSize: "0.75rem", margin: "4px 0 0" }}>Markdown report + pass/fail eval per rule</p>
          </div>
        </div>

        {/* Right: Summary */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Tools & Infrastructure */}
          <div style={{ background: "#1e293b", borderRadius: "12px", padding: "20px", border: "1px solid #334155" }}>
            <h3 style={{ margin: "0 0 12px", color: "#60a5fa", fontSize: "0.95rem" }}>Tools & Infrastructure</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                ["BAM Private Assistants API", "JWT auth, Claude 4.6 Sonnet, rate-limited"],
                ["2 Vector Stores (RAG)", "report_guidance + power_reference (132 files)"],
                ["Python 3.10+", "No external ML libraries; stdlib + httpx + pyyaml"],
                ["7 Claude Assistants", "Planner, 4 Writers, Editor, Guardrail"],
              ].map(([title, desc]) => (
                <li key={title}>
                  <strong style={{ color: "#e2e8f0", fontSize: "0.85rem" }}>{title}</strong>
                  <p style={{ color: "#64748b", fontSize: "0.75rem", margin: "2px 0 0" }}>{desc}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Prompt Strategies */}
          <div style={{ background: "#1e293b", borderRadius: "12px", padding: "20px", border: "1px solid #334155" }}>
            <h3 style={{ margin: "0 0 12px", color: "#a78bfa", fontSize: "0.95rem" }}>Prompt Strategies</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                ["Structured data inline", "CSV data parsed to JSON in prompt. Never put numbers in vector stores."],
                ["Task-specific instructions", "Each assistant gets tailored system prompt from YAML config + dynamic plan payload."],
                ["Explicit anti-hallucination", "Writers instructed to flag 'no evidence' rather than invent causal reasoning."],
                ["Guardrail loop", "Single-pass revision: guardrail returns 'revise' with explicit instructions, editor gets one retry."],
              ].map(([title, desc]) => (
                <li key={title}>
                  <strong style={{ color: "#e2e8f0", fontSize: "0.85rem" }}>{title}</strong>
                  <p style={{ color: "#64748b", fontSize: "0.75rem", margin: "2px 0 0" }}>{desc}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Eval Methods */}
          <div style={{ background: "#1e293b", borderRadius: "12px", padding: "20px", border: "1px solid #334155" }}>
            <h3 style={{ margin: "0 0 12px", color: "#34d399", fontSize: "0.95rem" }}>Evaluation Methods</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                ["Deterministic rules", "No LLM needed for scoring. Pure Python regex + numeric checks."],
                ["Tolerance-based numeric matching", "+/-0.05 units or +/-2% relative tolerance for transcription accuracy."],
                ["Directional language validation", "Match 'rose/fell/higher/lower' against actual z-score sign."],
                ["BLUF coverage check", "Top-3 primary movers by |z-score| must appear in BLUF summary."],
              ].map(([title, desc]) => (
                <li key={title}>
                  <strong style={{ color: "#e2e8f0", fontSize: "0.85rem" }}>{title}</strong>
                  <p style={{ color: "#64748b", fontSize: "0.75rem", margin: "2px 0 0" }}>{desc}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Test Modes */}
          <div style={{ background: "#1e293b", borderRadius: "12px", padding: "20px", border: "1px solid #334155" }}>
            <h3 style={{ margin: "0 0 12px", color: "#fbbf24", fontSize: "0.95rem" }}>3 Test Modes</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {[
                ["Offline", "--synthetic --stages 0-3", "Instant, no API", "#34d399"],
                ["Mock", "--synthetic --mock", "Full pipeline, ~2s", "#60a5fa"],
                ["Live", "(default)", "Real BAM API + RAG", "#a78bfa"],
              ].map(([name, cmd, desc, color]) => (
                <div key={name} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ color: color, fontWeight: 600, fontSize: "0.85rem", width: "50px" }}>{name}</span>
                  <code style={{ color: "#94a3b8", fontSize: "0.75rem", background: "#0f172a", padding: "4px 8px", borderRadius: "4px" }}>
                    {cmd}
                  </code>
                  <span style={{ color: "#64748b", fontSize: "0.75rem" }}>{desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
