"use client";

export default function InterfaceDesigningWidget() {
  const colors = [
    { name: "Primary", hex: "#3b82f6", usage: "Accent, CTAs" },
    { name: "Background", hex: "#0a0e1a", usage: "Main bg" },
    { name: "Card", hex: "#1a1f35", usage: "Card bg" },
    { name: "Success", hex: "#22c55e", usage: "Active states" },
    { name: "Warning", hex: "#f59e0b", usage: "Alerts" },
    { name: "Danger", hex: "#ef4444", usage: "Errors" },
  ];
  return (
    <div className="card p-4 animate-in">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">🎨</span>
        <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Interface Designing</h3>
        <span className="skill-badge active">interface-designing</span>
      </div>
      <div className="text-[10px] font-semibold tracking-wider mb-2" style={{color:"var(--text-muted)"}}>DESIGN SYSTEM</div>
      <div className="grid grid-cols-3 gap-2 mb-3">
        {colors.map((c,i) => (
          <div key={i} className="text-center">
            <div className="w-full h-8 rounded mb-1" style={{background:c.hex}} />
            <div className="text-[10px] font-semibold" style={{color:"var(--text-primary)"}}>{c.name}</div>
            <div className="text-[9px] font-mono" style={{color:"var(--text-muted)"}}>{c.hex}</div>
          </div>
        ))}
      </div>
      <div className="text-[10px] font-semibold tracking-wider mb-1" style={{color:"var(--text-muted)"}}>TYPOGRAPHY</div>
      <div className="space-y-1">
        <div className="text-lg font-bold" style={{color:"var(--text-primary)"}}>Geist Sans — Headings</div>
        <div className="text-sm" style={{color:"var(--text-secondary)"}}>Geist Mono — Code & Data</div>
        <div className="text-xs" style={{color:"var(--text-muted)"}}>13px base · 1.5 line-height</div>
      </div>
    </div>
  );
}
