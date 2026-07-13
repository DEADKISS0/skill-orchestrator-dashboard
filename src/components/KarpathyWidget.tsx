"use client";

const rules = [
  { rule: "No asumir sin preguntar", status: "pass", file: "page.tsx:12" },
  { rule: "Solución más simple primero", status: "pass", file: "layout.tsx:5" },
  { rule: "Cambios ortogonales", status: "warn", file: "globals.css:23" },
  { rule: "Verificar antes de claim", status: "pass", file: "utils.ts:8" },
  { rule: "No over-engineering", status: "pass", file: "components/:all" },
];

export default function KarpathyWidget() {
  const pass = rules.filter(r => r.status === "pass").length;
  return (
    <div className="card p-4 animate-in">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">🧠</span>
        <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Karpathy Rules</h3>
        <span className="skill-badge active">karpathy-rules</span>
      </div>
      <div className="flex items-center gap-3 mb-3">
        <div className="text-2xl font-bold" style={{color:"var(--success)"}}>{pass}/{rules.length}</div>
        <div className="text-xs" style={{color:"var(--text-muted)"}}>reglas cumplidas</div>
      </div>
      <div className="space-y-1">
        {rules.map((r,i) => (
          <div key={i} className="flex items-center justify-between p-2 rounded text-xs" style={{background:"var(--bg-secondary)"}}>
            <div className="flex items-center gap-2">
              <span style={{color: r.status==="pass"?"var(--success)":"var(--warning)"}}>
                {r.status==="pass"?"✓":"⚠"}
              </span>
              <span style={{color:"var(--text-secondary)"}}>{r.rule}</span>
            </div>
            <span className="font-mono text-[10px]" style={{color:"var(--text-muted)"}}>{r.file}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
