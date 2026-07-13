"use client";

const navGroups = [
  { label: "REPORTES", skills: ["MiroFish Reports", "Optimización"] },
  { label: "CATÁLOGO", skills: ["Skills Catalog", "Skills Hub"] },
  { label: "DATA & ANALYTICS", skills: ["Excel Widget", "Google Maps", "Google News", "Amazon Analyzer", "Metricool"] },
  { label: "RESEARCH", skills: ["Web Research", "Firecrawl", "NotebookLM"] },
  { label: "DEV & QA", skills: ["Karpathy Rules", "Debugging", "Verification", "QA Auditor", "Loop Mode", "Quality Loop"] },
  { label: "CONTENT", skills: ["X Publisher", "YouTube Clip", "Remotion", "Cronograma"] },
  { label: "STRATEGY", skills: ["Brainstorming", "Grill-Me", "Writing Plans", "Benchmarking", "Orchestrator"] },
  { label: "META", skills: ["Find Skills", "Skill Builder", "Skill Creator", "Masters", "Installer", "MCP", "A2A", "Consulta", "Superpowers", "Warpgrep"] },
];

export default function Sidebar({ activeWidget, onSelect }: { activeWidget: string; onSelect: (w: string) => void }) {
  return (
    <aside className="w-56 flex-shrink-0 overflow-y-auto py-3 px-3 border-r"
      style={{ borderColor: "var(--border)", background: "var(--bg-secondary)" }}>
      {navGroups.map((g) => (
        <div key={g.label} className="mb-4">
          <div className="text-[10px] font-semibold tracking-widest mb-2 px-2"
            style={{ color: "var(--text-muted)" }}>{g.label}</div>
          {g.skills.map((s) => (
            <button key={s} onClick={() => onSelect(s)}
              className="w-full text-left text-xs px-2 py-1.5 rounded transition-colors"
              style={{
                color: activeWidget === s ? "var(--accent)" : "var(--text-secondary)",
                background: activeWidget === s ? "rgba(59,130,246,0.1)" : "transparent",
              }}>
              {s}
            </button>
          ))}
        </div>
      ))}
    </aside>
  );
}
