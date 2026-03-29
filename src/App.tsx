import { useState } from "react";
import Presentation from "./components/Presentation";
import Demo from "./components/Demo";
import Architecture from "./components/Architecture";

const tabs = [
  { id: "presentation", label: "Presentation" },
  { id: "demo", label: "Illustrative Demo" },
  { id: "architecture", label: "Architecture" },
] as const;

type TabId = typeof tabs[number]["id"];

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>("presentation");

  return (
    <div style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}>
      {/* Tab Bar */}
      <nav
        style={{
          display: "flex",
          background: "#020617",
          borderBottom: "1px solid #1e293b",
          padding: "0 32px",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: "14px 24px",
              border: "none",
              borderBottom: activeTab === tab.id ? "2px solid #60a5fa" : "2px solid transparent",
              background: "none",
              color: activeTab === tab.id ? "#60a5fa" : "#64748b",
              fontWeight: activeTab === tab.id ? 600 : 400,
              fontSize: "0.9rem",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Tab Content */}
      {activeTab === "presentation" && <Presentation />}
      {activeTab === "demo" && <Demo />}
      {activeTab === "architecture" && <Architecture />}
    </div>
  );
}
