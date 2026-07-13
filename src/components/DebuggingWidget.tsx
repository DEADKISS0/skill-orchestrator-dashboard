"use client";

const phases = [
  { phase: "1. Root Cause", desc: "Identificar el problema exacto", status: "done", icon: "🎯" },
  { phase: "2. Pattern Analysis", desc: "Analizar patrones y repeticiones", status: "done", icon: "📊" },
  { phase: "3. Hypothesis", desc: "Formular hipótesis de causa", status: "active", icon: "🔬" },
  { phase: "4. Implementation", desc: "Implementar y verificar fix", status: "pending", icon: "🔧" },
];

export default function DebuggingWidget() {
  return (
    <div className="card p-4 animate-in">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">🐛</span>
        <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Systematic Debugging</h3>
        <span className="skill-badge active">systematic-debugging</span>
      </div>
      <div className="space-y-2">
        {phases.map((p,i) => (
          <div key={i} className="flex items-center gap-3 p-2 rounded" style={{
            background: p.status==="active"?"rgba(59,130,246,0.1)":"var(--bg-secondary)",
            border: p.status==="active"?"1px solid var(--accent)":"1px solid transparent",
          }}>
            <span className="text-lg">{p.icon}</span>
            <div className="flex-1">
              <div className="text-xs font-semibold" style={{color: p.status==="done"?"var(--success)":p.status==="active"?"var(--accent)":"var(--text-muted)"}}>{p.phase}</div>
              <div className="text-[11px]" style={{color:"var(--text-secondary)"}}>{p.desc}</div>
            </div>
            <span className="text-xs" style={{color: p.status==="done"?"var(--success)":p.status==="active"?"var(--accent)":"var(--text-muted)"}}>
              {p.status==="done"?"✓":p.status==="active"?"●":"○"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
