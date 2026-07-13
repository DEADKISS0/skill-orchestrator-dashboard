"use client";

const available = [
  { name: "excel-mcp-server", source: "GitHub", status: "installed" },
  { name: "advanced-excel-spreadsheet", source: "Kimi", status: "installed" },
  { name: "amazon-competitor-analyzer", source: "Kimi", status: "installed" },
  { name: "notebooklm-integration", source: "Kimi", status: "installed" },
];

export default function SkillInstallerWidget() {
  return (
    <div className="card p-4 animate-in">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">📦</span>
        <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Skill Installer</h3>
        <span className="skill-badge active">skill-installer</span>
      </div>
      <div className="space-y-2">
        {available.map((s,i) => (
          <div key={i} className="flex items-center justify-between p-2 rounded" style={{background:"var(--bg-secondary)"}}>
            <div className="flex items-center gap-2">
              <span className="text-xs" style={{color:"var(--text-primary)"}}>{s.name}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded" style={{background:"var(--bg-card)",color:"var(--text-muted)"}}>{s.source}</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded" style={{background:"rgba(34,197,94,0.15)",color:"var(--success)"}}>
              {s.status==="installed"?"✓ Instalado":"Instalar"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
