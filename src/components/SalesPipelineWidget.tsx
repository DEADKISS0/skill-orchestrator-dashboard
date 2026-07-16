"use client";
import { deals, salesMetrics, revenueScenarios } from "@/data/salesPipeline";

const statusColors: Record<string, string> = {
  prospecto: "var(--warning)",
  negociacion: "var(--accent)",
  "pre-contrato": "var(--success)",
  contratado: "var(--success)",
  activo: "var(--success)",
};

const statusLabels: Record<string, string> = {
  prospecto: "Prospecto",
  negociacion: "Negociación",
  "pre-contrato": "Pre-contrato",
  contratado: "Contratado",
  activo: "Activo",
};

const priorityColors: Record<string, string> = {
  critico: "var(--danger)",
  alto: "var(--warning)",
  medio: "var(--accent)",
};

export default function SalesPipelineWidget() {
  return (
    <div className="card p-4 animate-in col-span-2">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">💰</span>
        <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Pipeline de Ventas</h3>
        <span className="skill-badge support">CRÍTICO</span>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
        {salesMetrics.map((m) => (
          <div key={m.label} className="p-2 rounded-lg text-center" style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}>
            <div className="text-lg mb-1">{m.icon}</div>
            <div className="text-sm font-bold" style={{ color: m.color }}>{m.value}</div>
            <div className="text-[10px]" style={{ color: "var(--text-muted)" }}>{m.label}</div>
          </div>
        ))}
      </div>

      {/* Deals */}
      <div className="mb-4">
        <div className="text-xs font-semibold mb-2" style={{ color: "var(--text-primary)" }}>Prospectos Activos</div>
        <div className="space-y-2">
          {deals.map((deal) => (
            <div key={deal.id} className="p-2 rounded-lg" style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: statusColors[deal.status] }} />
                  <span className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>{deal.name}</span>
                </div>
                <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: `${priorityColors[deal.priority]}20`, color: priorityColors[deal.priority] }}>
                  {deal.priority}
                </span>
              </div>
              <div className="flex items-center gap-4 text-[10px]" style={{ color: "var(--text-muted)" }}>
                <span>{deal.value}</span>
                <span>{deal.monthlyFee}</span>
                <span>{deal.timeline}</span>
                <span className="px-1 rounded" style={{ background: `${statusColors[deal.status]}20`, color: statusColors[deal.status] }}>
                  {statusLabels[deal.status]}
                </span>
              </div>
              <div className="text-[10px] mt-1" style={{ color: "var(--text-secondary)" }}>
                → {deal.nextStep}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Revenue Scenarios */}
      <div>
        <div className="text-xs font-semibold mb-2" style={{ color: "var(--text-primary)" }}>Escenarios de Ingresos (12 meses)</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
          {revenueScenarios.slice(0, 4).map((s) => (
            <div key={s.name} className="p-1.5 rounded text-center" style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}>
              <div className="text-[10px] font-medium" style={{ color: "var(--text-primary)" }}>{s.name}</div>
              <div className="text-xs font-bold" style={{ color: "var(--accent)" }}>{s.revenue}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
