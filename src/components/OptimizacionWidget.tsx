"use client";
import { useState, useEffect } from "react";

interface OptReport {
  name: string;
  path: string;
  date: string;
  type: string;
}

export default function OptimizacionWidget() {
  const [reports, setReports] = useState<Record<string, OptReport[]>>({
    diarios: [],
    semanales: [],
    mensuales: [],
    dashboards: [],
  });
  const [activeTab, setActiveTab] = useState("diarios");

  useEffect(() => {
    fetch("/optimizacion/reports_index.json")
      .then((r) => r.json())
      .then((data) => {
        if (data?.reports) setReports(data.reports);
      })
      .catch(() => {
        // No index yet
      });
  }, []);

  const tabs = [
    { key: "diarios", label: "Diarios", icon: "📅" },
    { key: "semanales", label: "Semanales", icon: "📆" },
    { key: "mensuales", label: "Mensuales", icon: "📊" },
    { key: "dashboards", label: "Dashboards", icon: "📈" },
  ];

  const currentReports = reports[activeTab] || [];
  const counts = tabs.map((t) => ({
    key: t.key,
    count: (reports[t.key] || []).length,
  }));

  return (
    <div className="card p-4 animate-in">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">📋</span>
        <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
          Reportes de Optimización
        </h3>
        <span className="skill-badge support">
          {Object.values(reports).reduce((a, b) => a + b.length, 0)} reportes
        </span>
      </div>

      <div className="flex gap-2 mb-3">
        {tabs.map((tab) => {
          const count = counts.find((c) => c.key === tab.key)?.count ?? 0;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className="flex items-center gap-1 px-3 py-1.5 rounded text-xs transition-colors"
              style={{
                background:
                  activeTab === tab.key ? "var(--accent)" : "var(--bg-secondary)",
                color:
                  activeTab === tab.key ? "white" : "var(--text-secondary)",
              }}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
              {count > 0 && (
                <span
                  className="px-1 rounded text-[10px]"
                  style={{
                    background:
                      activeTab === tab.key
                        ? "rgba(255,255,255,0.2)"
                        : "rgba(100,116,139,0.3)",
                  }}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="space-y-1">
        {currentReports.length > 0 ? (
          currentReports.map((r, i) => (
            <div
              key={i}
              className="flex items-center gap-2 p-2 rounded text-xs"
              style={{ background: "var(--bg-secondary)" }}
            >
              <span className="text-sm">📄</span>
              <div className="flex-1 min-w-0">
                <div className="font-semibold truncate" style={{ color: "var(--text-primary)" }}>
                  {r.name}
                </div>
                <div className="text-[11px]" style={{ color: "var(--text-muted)" }}>
                  {r.date} · {r.type}
                </div>
              </div>
              <a
                href={r.path}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-[10px] px-2 py-1"
              >
                Ver
              </a>
            </div>
          ))
        ) : (
          <div className="p-6 text-center" style={{ color: "var(--text-muted)" }}>
            <p className="text-sm">
              No hay reportes de {activeTab} aún.
            </p>
            <p className="text-xs mt-1">
              Los reportes aparecerán aquí cuando estén disponibles.
            </p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-4 gap-2 mt-3">
        {counts.map((c) => (
          <div
            key={c.key}
            className="p-2 rounded text-center"
            style={{ background: "var(--bg-secondary)" }}
          >
            <div
              className="text-lg font-bold"
              style={{
                color:
                  c.count > 0 ? "var(--success)" : "var(--text-muted)",
              }}
            >
              {c.count}
            </div>
            <div className="text-[10px]" style={{ color: "var(--text-muted)" }}>
              {c.key.charAt(0).toUpperCase() + c.key.slice(1)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
