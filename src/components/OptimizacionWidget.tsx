"use client";
import { useState, useEffect, useCallback } from "react";
import WidgetCard from "@/components/ui/WidgetCard";

interface OptReport {
  name: string;
  path: string;
  date: string;
  type: string;
}

interface ReportsByTab {
  diarios: OptReport[];
  semanales: OptReport[];
  mensuales: OptReport[];
  dashboards: OptReport[];
}

export default function OptimizacionWidget() {
  const [reports, setReports] = useState<ReportsByTab>({
    diarios: [],
    semanales: [],
    mensuales: [],
    dashboards: [],
  });
  const [activeTab, setActiveTab] = useState<keyof ReportsByTab>("diarios");
  const [selected, setSelected] = useState<OptReport | null>(null);
  const [lastUpdate, setLastUpdate] = useState<string>("");
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchReports = useCallback(() => {
    fetch("/optimizacion/reports_index.json")
      .then((r) => r.json())
      .then((data) => {
        if (data?.reports) {
          setReports(data.reports);
          const current = data.reports[activeTab];
          if (current && current.length > 0) {
            setSelected(prev => prev && current.find((r: OptReport) => r.path === prev.path) ? prev : current[0]);
          }
        }
        setLastUpdate(new Date().toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" }));
      })
      .catch(() => {});
  }, [activeTab]);

  useEffect(() => {
    fetchReports();
    const interval = setInterval(fetchReports, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [refreshKey, activeTab]);

  const tabs = [
    { key: "diarios" as const, label: "Diarios", icon: "📅" },
    { key: "semanales" as const, label: "Semanales", icon: "📆" },
    { key: "mensuales" as const, label: "Mensuales", icon: "📊" },
    { key: "dashboards" as const, label: "Dashboards", icon: "📈" },
  ];

  const currentReports = reports[activeTab] || [];
  const total = Object.values(reports).reduce((a, b) => a + b.length, 0);

  return (
    <WidgetCard
      title="Reportes de Optimización"
      icon="📋"
      badge={`${total} reportes`}
      action={
        <button onClick={() => setRefreshKey((k) => k + 1)} className="btn-ghost !py-1 !px-2" title="Actualizar">
          ↻
        </button>
      }
    >
      <div className="flex gap-2 mb-3">
        {tabs.map((tab) => {
          const count = (reports[tab.key] || []).length;
          return (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              className="flex items-center gap-1 px-3 py-1.5 rounded text-xs transition-colors"
              style={{
                background: activeTab === tab.key ? "var(--ember)" : "var(--bg-secondary)",
                color: activeTab === tab.key ? "white" : "var(--text-secondary)",
              }}>
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
              {count > 0 && (
                <span className="px-1 rounded text-[10px]"
                  style={{ background: activeTab === tab.key ? "rgba(255,255,255,0.2)" : "rgba(100,116,139,0.3)" }}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* report navigation */}
      {currentReports.length > 1 && (
        <div className="flex gap-2 mb-3 flex-wrap">
          {currentReports.map((r, i) => (
            <button key={i} onClick={() => setSelected(r)}
              className="text-xs px-2 py-1 rounded transition-colors"
              style={{
                background: selected?.path === r.path ? "var(--ember)" : "var(--bg-secondary)",
                color: selected?.path === r.path ? "white" : "var(--text-secondary)",
              }}>
              {r.name}
            </button>
          ))}
        </div>
      )}

      {/* preview */}
      {selected ? (
        <div className="space-y-3">
          <iframe src={selected.path}
            className="w-full rounded border report-iframe"
            style={{ borderColor: "var(--border)", background: "var(--bg-secondary)" }}
            title={selected.name} />
          <div className="flex gap-2">
            <a href={selected.path} download className="btn-primary text-xs flex items-center gap-1">
              📄 Descargar PDF
            </a>
            <a href={selected.path} target="_blank" rel="noopener noreferrer"
              className="text-xs px-2 py-1 rounded transition-colors"
              style={{ color: "var(--text-secondary)", background: "var(--bg-secondary)" }}>
              ↗ Abrir en nueva pestaña
            </a>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center" style={{ color: "var(--text-muted)" }}>
          <p className="text-sm">No hay reportes de {activeTab} aún.</p>
          <p className="text-xs mt-1">Los reportes aparecerán aquí cuando estén disponibles.</p>
        </div>
      )}

      {/* footer */}
      {lastUpdate && (
        <div className="mt-2 text-[10px] text-right" style={{ color: "var(--text-muted)" }}>
          Última actualización: {lastUpdate}
        </div>
      )}
    </WidgetCard>
  );
}
