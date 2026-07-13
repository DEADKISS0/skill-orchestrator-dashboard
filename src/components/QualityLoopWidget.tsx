"use client";

export default function QualityLoopWidget() {
  const metrics = [
    { label: "Code Quality", score: 92, max: 100 },
    { label: "Test Coverage", score: 87, max: 100 },
    { label: "Performance", score: 94, max: 100 },
    { label: "Accessibility", score: 78, max: 100 },
    { label: "UX Score", score: 88, max: 100 },
  ];
  const avg = Math.round(metrics.reduce((a,m) => a + m.score, 0) / metrics.length);
  return (
    <div className="card p-4 animate-in">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">♾️</span>
        <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Infinite Quality Loop</h3>
        <span className="skill-badge active">infinite-quality-loop</span>
      </div>
      <div className="text-center mb-3">
        <div className="text-3xl font-bold" style={{color: avg>=90?"var(--success)":"var(--accent)"}}>{avg}</div>
        <div className="text-[10px]" style={{color:"var(--text-muted)"}}>SCORE PROMEDIO</div>
      </div>
      <div className="space-y-2">
        {metrics.map((m,i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="text-[11px] w-24 truncate" style={{color:"var(--text-secondary)"}}>{m.label}</span>
            <div className="flex-1 h-1.5 rounded-full" style={{background:"var(--bg-secondary)"}}>
              <div className="h-1.5 rounded-full" style={{width:`${m.score}%`, background: m.score>=90?"var(--success)":"var(--accent)"}} />
            </div>
            <span className="text-[11px] font-mono w-8 text-right" style={{color:"var(--text-muted)"}}>{m.score}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
