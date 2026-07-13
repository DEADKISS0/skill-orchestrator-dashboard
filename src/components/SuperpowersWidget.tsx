"use client";

const phases = [
  { name: "Brainstorming", status: "done" },
  { name: "Worktrees", status: "done" },
  { name: "Planning", status: "done" },
  { name: "Subagents", status: "active" },
  { name: "TDD", status: "pending" },
  { name: "Code Review", status: "pending" },
];

export default function SuperpowersWidget() {
  return (
    <div className="card p-4 animate-in">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">⚡</span>
        <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Superpowers Dev Framework</h3>
        <span className="skill-badge support">superpowers</span>
      </div>
      <div className="flex gap-1">
        {phases.map((p,i) => (
          <div key={i} className="flex-1 text-center">
            <div className="h-8 rounded mb-1 flex items-center justify-center text-xs"
              style={{
                background: p.status==="done"?"var(--success)":p.status==="active"?"var(--accent)":"var(--bg-secondary)",
                color: p.status==="pending"?"var(--text-muted)":"white",
              }}>
              {p.status==="done"?"✓":p.status==="active"?"●":i+1}
            </div>
            <span className="text-[9px]" style={{color:"var(--text-muted)"}}>{p.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
