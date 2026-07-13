"use client";

const skills = [
  { name: "excel-mcp-server", category: "Data", installed: true },
  { name: "advanced-excel-spreadsheet", category: "Data", installed: true },
  { name: "amazon-competitor-analyzer", category: "E-commerce", installed: true },
  { name: "notebooklm-integration", category: "Research", installed: true },
  { name: "google-maps-extractor", category: "Research", installed: true },
  { name: "firecrawl", category: "Web", installed: true },
];

export default function FindSkillsWidget() {
  return (
    <div className="card p-4 animate-in">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">🔎</span>
        <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Find Skills</h3>
        <span className="skill-badge active">find-skills</span>
      </div>
      <input className="input-dark w-full mb-3" placeholder="Buscar skills del ecosistema..." />
      <div className="space-y-1">
        {skills.map((s,i) => (
          <div key={i} className="flex items-center justify-between p-1.5 rounded text-xs" style={{background:"var(--bg-secondary)"}}>
            <div className="flex items-center gap-2">
              <span style={{color:"var(--text-primary)"}}>{s.name}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded" style={{background:"var(--bg-card)",color:"var(--text-muted)"}}>{s.category}</span>
            </div>
            <span className="text-[10px]" style={{color: s.installed?"var(--success)":"var(--text-muted)"}}>
              {s.installed?"✓":"Instalar"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
