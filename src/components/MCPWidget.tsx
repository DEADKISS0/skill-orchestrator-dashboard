"use client";

const servers = [
  { name: "Excel MCP", status: "active", tools: ["read", "write", "formula"], requests: 1247 },
  { name: "Filesystem MCP", status: "active", tools: ["read", "write", "search"], requests: 3421 },
  { name: "Web Search MCP", status: "active", tools: ["search", "scrape"], requests: 892 },
  { name: "Database MCP", status: "idle", tools: ["query", "schema"], requests: 0 },
];

export default function MCPWidget() {
  return (
    <div className="card p-4 animate-in">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">🔌</span>
        <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>MCP Client</h3>
        <span className="skill-badge active">mcp-client</span>
      </div>
      <div className="space-y-2">
        {servers.map((s,i) => (
          <div key={i} className="p-2 rounded" style={{background:"var(--bg-secondary)"}}>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <div className="pulse-dot" style={{background: s.status==="active"?"var(--success)":"var(--text-muted)"}} />
                <span className="text-xs font-semibold" style={{color:"var(--text-primary)"}}>{s.name}</span>
              </div>
              <span className="text-[10px]" style={{color:"var(--text-muted)"}}>{s.requests} reqs</span>
            </div>
            <div className="flex gap-1">
              {s.tools.map((t,j) => (
                <span key={j} className="text-[10px] px-1.5 py-0.5 rounded" style={{background:"var(--bg-card)",color:"var(--accent)"}}>{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
