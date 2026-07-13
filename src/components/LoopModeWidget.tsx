"use client";

export default function LoopModeWidget() {
  const cycles = [
    { cycle: 1, score: 65, action: "Implementar features base" },
    { cycle: 2, score: 78, action: "Refactorizar componentes" },
    { cycle: 3, score: 88, action: "Optimizar performance" },
    { cycle: 4, score: 94, action: "Polish visual final" },
  ];
  return (
    <div className="card p-4 animate-in">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">🔄</span>
        <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Loop Mode</h3>
        <span className="skill-badge active">loop-mode</span>
      </div>
      <div className="space-y-2">
        {cycles.map((c,i) => (
          <div key={i} className="p-2 rounded" style={{background:"var(--bg-secondary)"}}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold" style={{color:"var(--text-primary)"}}>Ciclo {c.cycle}</span>
              <span className="text-xs font-bold" style={{color: c.score>=90?"var(--success)":c.score>=80?"var(--accent)":"var(--warning)"}}>{c.score}/100</span>
            </div>
            <div className="h-1.5 rounded-full mb-1" style={{background:"var(--bg-card)"}}>
              <div className="h-1.5 rounded-full" style={{width:`${c.score}%`, background: c.score>=90?"var(--success)":c.score>=80?"var(--accent)":"var(--warning)"}} />
            </div>
            <span className="text-[11px]" style={{color:"var(--text-muted)"}}>{c.action}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
