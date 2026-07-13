"use client";

const agents = [
  { name: "Research Agent", role: "Investigación", status: "active", protocol: "A2A" },
  { name: "Code Agent", role: "Desarrollo", status: "active", protocol: "A2A" },
  { name: "Review Agent", role: "Code Review", status: "waiting", protocol: "A2A" },
  { name: "Deploy Agent", role: "Deployment", status: "idle", protocol: "A2A" },
];

export default function MultiAgentWidget() {
  return (
    <div className="card p-4 animate-in">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">🤖</span>
        <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Multi-Agent Orchestrator</h3>
        <span className="skill-badge active">multi-agent-orchestrator</span>
      </div>
      <div className="space-y-2">
        {agents.map((a,i) => (
          <div key={i} className="flex items-center gap-3 p-2 rounded" style={{background:"var(--bg-secondary)"}}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
              style={{background: a.status==="active"?"var(--accent)":a.status==="waiting"?"var(--warning)":"var(--bg-card)", color: a.status==="idle"?"var(--text-muted)":"white"}}>
              {a.name.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="text-xs font-semibold" style={{color:"var(--text-primary)"}}>{a.name}</div>
              <div className="text-[11px]" style={{color:"var(--text-muted)"}}>{a.role}</div>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[10px] px-1.5 py-0.5 rounded" style={{background:"var(--bg-card)",color:"var(--accent)"}}>{a.protocol}</span>
              <span className="text-[10px]" style={{color: a.status==="active"?"var(--success)":a.status==="waiting"?"var(--warning)":"var(--text-muted)"}}>
                {a.status==="active"?"●":a.status==="waiting"?"◐":"○"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
