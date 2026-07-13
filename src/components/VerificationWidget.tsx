"use client";

const checks = [
  { item: "Código compila sin errores", done: true },
  { item: "Tests pasan al 100%", done: true },
  { item: "Linting sin warnings", done: false },
  { item: "Tipos TypeScript correctos", done: true },
  { item: "Responsive en mobile", done: true },
  { item: "Performance > 90 Lighthouse", done: false },
];

export default function VerificationWidget() {
  const done = checks.filter(c => c.done).length;
  return (
    <div className="card p-4 animate-in">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">✅</span>
        <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Verification Checklist</h3>
        <span className="skill-badge active">verification-before-completion</span>
      </div>
      <div className="flex items-center gap-2 mb-3">
        <div className="flex-1 h-2 rounded-full" style={{background:"var(--bg-secondary)"}}>
          <div className="h-2 rounded-full transition-all" style={{width:`${(done/checks.length)*100}%`, background: done===checks.length?"var(--success)":"var(--accent)"}} />
        </div>
        <span className="text-xs font-semibold" style={{color:"var(--text-muted)"}}>{done}/{checks.length}</span>
      </div>
      <div className="space-y-1">
        {checks.map((c,i) => (
          <div key={i} className="flex items-center gap-2 p-1.5 text-xs" style={{color: c.done?"var(--success)":"var(--text-secondary)"}}>
            <span>{c.done?"✓":"○"}</span>
            <span style={{textDecoration: c.done?"line-through":"none", opacity: c.done?0.6:1}}>{c.item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
