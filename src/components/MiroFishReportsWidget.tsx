"use client";
import { useState, useEffect, useCallback } from "react";
import WidgetCard from "@/components/ui/WidgetCard";

interface ReportEntry {
  date: string;
  label?: string;
  pdf: string;
  excel: string;
  heuristic?: boolean;
  summary?: {
    total_changes?: number;
    trends?: number;
    anomalies?: number;
    risks?: number;
    opportunities?: number;
    next_actions?: number;
  };
}

export default function MiroFishReportsWidget() {
  const [reports, setReports] = useState<ReportEntry[]>([]);
  const [selectedReport, setSelectedReport] = useState<ReportEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<string>("");
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchReports = useCallback(() => {
    fetch("/reports/predicciones_index.json")
      .then((r) => r.json())
      .then((data) => {
        const list: ReportEntry[] = (data.reports || []).map((r: ReportEntry) => ({
          ...r,
          heuristic: r.label?.toLowerCase().includes("heuríst") || false,
        }));
        setReports(list);
        if (list.length > 0) setSelectedReport(list[0]);
        setLastUpdate(new Date().toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" }));
      })
      .catch(() => {
        if (reports.length === 0) {
          setSelectedReport({
            date: new Date().toISOString().slice(0, 10),
            pdf: "/reports/Reporte_Prediccion_Ultimo.pdf",
            excel: "/reports/Reporte_Prediccion_Ultimo.xlsx",
          });
        }
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchReports();
    const interval = setInterval(fetchReports, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [refreshKey]);

  // --- loading state ---
  if (loading && reports.length === 0) {
    return (
      <div className="card p-4 animate-in" id="mirofish-reports">
        <div className="skeleton-shimmer h-8 w-48 rounded mb-2" />
        <div className="skeleton-shimmer h-64 rounded" />
      </div>
    );
  }

  return (
    <WidgetCard
      title="Reportes de Predicciones — MiroFish-Lite"
      icon="📊"
      badge={`${reports.length} reportes`}
      badgeVariant="active"
      action={
        <button onClick={() => setRefreshKey((k) => k + 1)} className="btn-ghost !py-1 !px-2" title="Actualizar">
          ↻
        </button>
      }
    >
      <div className="flex gap-2 mb-3 flex-wrap">
        {selectedReport?.heuristic && (
          <span className="skill-badge heuristic" title="Generado sin IA conectada">Modo heurístico</span>
        )}
        {!selectedReport?.heuristic && selectedReport && (
          <span className="skill-badge active">Generado con IA</span>
        )}
      </div>
      {reports.length > 0 && (
        <div className="flex gap-2 mb-3 flex-wrap">
          {reports.map((r, i) => (
            <button
              key={i}
              onClick={() => setSelectedReport(r)}
              className="text-xs px-2 py-1 rounded transition-colors"
              style={{
                background: selectedReport?.date === r.date ? "var(--ember)" : "var(--bg-secondary)",
                color: selectedReport?.date === r.date ? "white" : "var(--text-secondary)",
              }}
            >
              {r.label || r.date}
            </button>
          ))}
        </div>
      )}

      {/* report viewer */}
      {selectedReport && (
        <div className="space-y-3">
          <div className="flex gap-4 items-start">
            <div className="flex-1">
              {selectedReport.pdf && (
                <iframe
                  src={selectedReport.pdf}
                  className="w-full rounded border report-iframe"
                  style={{
                    borderColor: "var(--border)",
                    background: "var(--bg-secondary)",
                  }}
                  title="Reporte PDF"
                />
              )}
            </div>
          </div>

          {/* download buttons */}
          <div className="flex gap-2 flex-wrap">
            {selectedReport.pdf && (
              <a href={selectedReport.pdf} download className="btn-primary text-xs flex items-center gap-1">
                📄 Descargar PDF
              </a>
            )}
            {selectedReport.excel && (
              <a href={selectedReport.excel} download
                className="btn-primary text-xs flex items-center gap-1"
                style={{ background: "var(--success)" }}>
                📊 Descargar Excel
              </a>
            )}
          </div>

          {/* KPIs */}
          {selectedReport.summary && (
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
              {[
                { label: "Cambios", value: selectedReport.summary.total_changes, color: "var(--ember)" },
                { label: "Tendencias", value: selectedReport.summary.trends, color: "var(--warning)" },
                { label: "Anomalías", value: selectedReport.summary.anomalies, color: "var(--danger)" },
                { label: "Riesgos", value: selectedReport.summary.risks, color: "var(--danger)" },
                { label: "Oportunidades", value: selectedReport.summary.opportunities, color: "var(--success)" },
                { label: "Acciones", value: selectedReport.summary.next_actions, color: "var(--ember)" },
              ].map((m) => (
                <div key={m.label} className="p-2 rounded text-center" style={{ background: "var(--bg-secondary)" }}>
                  <div className="text-lg font-bold" style={{ color: m.color }}>
                    {m.value ?? "—"}
                  </div>
                  <div className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* empty state */}
      {!selectedReport && (
        <div className="p-8 text-center" style={{ color: "var(--text-muted)" }}>
          <p className="text-sm">No hay reportes generados aún.</p>
          <p className="text-xs mt-1">El bot genera reportes automáticamente a las 05:00 y 17:00.</p>
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
