"use client";
import { financialMetrics, teamCosts, keyDeadlines } from "@/data/financialHealth";

const urgencyColors: Record<string, string> = {
  critico: "var(--danger)",
  alto: "var(--warning)",
  medio: "var(--accent)",
};

export default function FinancialHealthWidget() {
  return (
    <div className="card p-4 animate-in col-span-2">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">📊</span>
        <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Salud Financiera</h3>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
        {financialMetrics.slice(0, 6).map((m) => (
          <div key={m.label} className="p-2 rounded-lg" style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm">{m.icon}</span>
              <span className="text-[10px] font-medium" style={{ color: "var(--text-primary)" }}>{m.label}</span>
            </div>
            <div className="text-sm font-bold" style={{ color: m.color }}>{m.value}</div>
            {m.subtitle && (
              <div className="text-[10px] mt-0.5" style={{ color: "var(--text-muted)" }}>{m.subtitle}</div>
            )}
          </div>
        ))}
      </div>

      {/* Team Costs */}
      <div className="mb-4">
        <div className="text-xs font-semibold mb-2" style={{ color: "var(--text-primary)" }}>Costos de Equipo</div>
        <div className="space-y-1">
          {teamCosts.slice(0, 5).map((cost) => (
            <div key={cost.name} className="flex items-center justify-between text-[10px] px-2 py-1 rounded" style={{ background: "var(--bg-secondary)" }}>
              <span style={{ color: "var(--text-primary)" }}>{cost.name}</span>
              <span className="font-medium" style={{ color: "var(--text-secondary)" }}>{cost.amount}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Deadlines */}
      <div>
        <div className="text-xs font-semibold mb-2" style={{ color: "var(--text-primary)" }}>Fechas Clave</div>
        <div className="space-y-1">
          {keyDeadlines.map((d) => (
            <div key={d.event} className="flex items-center gap-2 text-[10px] px-2 py-1 rounded" style={{ background: "var(--bg-secondary)" }}>
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: urgencyColors[d.urgency] }} />
              <span className="flex-1" style={{ color: "var(--text-primary)" }}>{d.event}</span>
              <span style={{ color: "var(--text-muted)" }}>{d.deadline}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
