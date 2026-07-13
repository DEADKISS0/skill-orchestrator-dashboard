"use client";

const experts = [
  { name: "Andrej Karpathy", field: "AI/ML", source: "GitHub, Blog", skills: 3 },
  { name: "Dan Abramov", field: "React", source: "Twitter, Blog", skills: 2 },
  { name: "Kent C. Dodds", field: "Testing", source: "Blog, Videos", skills: 2 },
];

export default function SkillFromMastersWidget() {
  return (
    <div className="card p-4 animate-in">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">🎓</span>
        <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Skill From Masters</h3>
        <span className="skill-badge active">skill-from-masters</span>
      </div>
      <div className="space-y-2">
        {experts.map((e,i) => (
          <div key={i} className="flex items-center gap-3 p-2 rounded" style={{background:"var(--bg-secondary)"}}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
              style={{background:"var(--accent)",color:"white"}}>{e.name.charAt(0)}</div>
            <div className="flex-1">
              <div className="text-xs font-semibold" style={{color:"var(--text-primary)"}}>{e.name}</div>
              <div className="text-[11px]" style={{color:"var(--text-muted)"}}>{e.field} · {e.source}</div>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded" style={{background:"var(--bg-card)",color:"var(--success)"}}>{e.skills} skills</span>
          </div>
        ))}
      </div>
    </div>
  );
}
