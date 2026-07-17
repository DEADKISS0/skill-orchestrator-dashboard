"use client";

/** A2A Agent Cards — reflejan el control plane real del Mega Dashboard */
const agents = [
  { name: "Auth Agent", role: "Roles ops/pitch/client + middleware", status: "active", protocol: "A2A" },
  { name: "Quarantine Agent", role: "Shell badges + Skills Hub deep-links", status: "active", protocol: "A2A" },
  { name: "Health Agent", role: "Ping ecosistema en /api/automation", status: "active", protocol: "A2A" },
  { name: "Growth Agent", role: "GA4 / News / Metricool (S3)", status: "active", protocol: "A2A" },
  { name: "CRM Agent", role: "Excluido — sin repos externos", status: "idle", protocol: "A2A" },
];

export default function MultiAgentWidget() {
  return (
    <div className="card p-4 animate-in">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">🤖</span>
        <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
          Multi-Agent Orchestrator
        </h3>
        <span className="skill-badge active">A2A · Sprint 4</span>
      </div>
      <div className="space-y-2">
        {agents.map((a) => (
          <div
            key={a.name}
            className="flex items-center gap-3 p-2 rounded"
            style={{ background: "var(--bg-secondary)" }}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
              style={{
                background:
                  a.status === "active"
                    ? "var(--accent)"
                    : a.status === "waiting"
                      ? "var(--warning)"
                      : "var(--bg-card)",
                color: a.status === "idle" ? "var(--text-muted)" : "white",
              }}
            >
              {a.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>
                {a.name}
              </div>
              <div className="text-[11px] truncate" style={{ color: "var(--text-muted)" }}>
                {a.role}
              </div>
            </div>
            <div className="flex items-center gap-1">
              <span
                className="text-[10px] px-1.5 py-0.5 rounded"
                style={{ background: "var(--bg-card)", color: "var(--accent)" }}
              >
                {a.protocol}
              </span>
              <span
                className="text-[10px]"
                style={{
                  color:
                    a.status === "active"
                      ? "var(--success)"
                      : a.status === "waiting"
                        ? "var(--warning)"
                        : "var(--text-muted)",
                }}
              >
                {a.status === "active" ? "●" : a.status === "waiting" ? "◐" : "○"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
