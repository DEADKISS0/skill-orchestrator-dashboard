"use client";
import { useState, useEffect, useCallback } from "react";
import WidgetCard from "@/components/ui/WidgetCard";

interface EstrategicoEntry {
  date: string;
  label?: string;
  pdf: string;
  excel: string;
  summary?: {
    progreso?: string;
    acciones?: number;
    urgentes?: number;
  };
}

export default function ReportesEstrategicosWidget() {
  const [reports, setReports] = useState<EstrategicoEntry[]>([]);
  const [selectedReport, setSelectedReport] = useState<EstrategicoEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<string>("");
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchReports = useCallback(() => {
    fetch("/reports/estrategicos_index.json")
      .then((r) => r.json())
      .then((data) => {
        const list: EstrategicoEntry[] = data.reports || [];
        setReports(list);
        if (list.length > 0) setSelectedReport(list[0]);
        setLastUpdate(new Date().toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" }));
      })
      .catch(() => {
        if (reports.length === 0) {
          setSelectedReport({
            date: new Date().toISOString().slice(0, 10),
            pdf: "/reports/Reporte_Optimizacion_Ultimo.pdf",
            excel: "/reports/Reporte_Optimizacion_Ultimo.xlsx",
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

  if (loading && reports.length === 0) {
    return (
      <div className="card p-4 animate-in" id="estrategia">
        <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Cargando reportes...</h3>
      </div>
    );
  }

  return (
    <WidgetCard
      title="Reportes de Optimización Estratégica"
      icon="🎯"
      badge={`${reports.length} reportes`}
      badgeVariant="active"
      action={
        <button onClick={() => setRefreshKey((k) => k + 1)} className="btn-ghost !py-1 !px-2" title="Actualizar">
          ↻
        </button>
      }
    >
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
                  title="Reporte Estratégico PDF"
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
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "Progreso", value: selectedReport.summary.progreso, color: "var(--ember)" },
                { label: "Acciones", value: selectedReport.summary.acciones, color: "var(--warning)" },
                { label: "Urgentes", value: selectedReport.summary.urgentes, color: "var(--danger)" },
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
          <p className="text-sm">No hay reportes estratégicos generados aún.</p>
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
