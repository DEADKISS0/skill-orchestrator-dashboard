"use client";

const templates = [
  { name: "Web Scraper", triggers: ["scrape", "extract"], scope: "web", lines: 95 },
  { name: "Data Analyzer", triggers: ["analyze", "data"], scope: "analytics", lines: 88 },
  { name: "Code Reviewer", triggers: ["review", "audit"], scope: "dev", lines: 102 },
];

export default function SkillCreatorWidget() {
  return (
    <div className="card p-4 animate-in">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">🛠️</span>
        <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Skill Creator</h3>
        <span className="skill-badge active">skill-creator</span>
      </div>
      <div className="space-y-2">
        {templates.map((t,i) => (
          <div key={i} className="p-2 rounded" style={{background:"var(--bg-secondary)"}}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold" style={{color:"var(--text-primary)"}}>{t.name}</span>
              <span className="text-[10px]" style={{color:"var(--text-muted)"}}>{t.lines} líneas</span>
            </div>
            <div className="flex gap-1">
              {t.triggers.map((tr,j) => (
                <span key={j} className="text-[10px] px-1.5 py-0.5 rounded" style={{background:"var(--bg-card)",color:"var(--accent)"}}>{tr}</span>
              ))}
              <span className="text-[10px] px-1.5 py-0.5 rounded" style={{background:"var(--bg-card)",color:"var(--text-muted)"}}>{t.scope}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
