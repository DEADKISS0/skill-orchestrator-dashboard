"use client";
import { useState, useEffect } from "react";

interface ReportEntry {
  date: string;
  pdf: string;
  excel: string;
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

  useEffect(() => {
    fetch("/reports/reports_index.json")
      .then((r) => r.json())
      .then((data) => {
        const list: ReportEntry[] = data.reports || [];
        setReports(list);
        if (list.length > 0) setSelectedReport(list[0]);
      })
      .catch(() => {
        // No index yet, try latest
        setSelectedReport({
          date: new Date().toISOString().slice(0, 10),
          pdf: "/reports/Reporte_Prediccion_Ultimo.pdf",
          excel: "/reports/Reporte_Prediccion_Ultimo.xlsx",
        });
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="card p-4 animate-in">
        <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Cargando reportes...</h3>
      </div>
    );
  }

  return (
    <div className="card p-4 animate-in col-span-2">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">📊</span>
        <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Reportes de Predicciones — MiroFish-Lite</h3>
        <span className="skill-badge active">{reports.length} reportes</span>
      </div>

      {reports.length > 1 && (
        <div className="flex gap-2 mb-3 flex-wrap">
          {reports.map((r, i) => (
            <button
              key={i}
              onClick={() => setSelectedReport(r)}
              className="text-xs px-2 py-1 rounded transition-colors"
              style={{
                background: selectedReport?.date === r.date ? "var(--accent)" : "var(--bg-secondary)",
                color: selectedReport?.date === r.date ? "white" : "var(--text-secondary)",
              }}
            >
              {r.date}
            </button>
          ))}
        </div>
      )}

      {selectedReport && (
        <div className="space-y-3">
          <div className="flex gap-4 items-start">
            <div className="flex-1">
              {selectedReport.pdf && (
                <iframe
                  src={selectedReport.pdf}
                  className="w-full rounded border"
                  style={{
                    height: "500px",
                    borderColor: "var(--border)",
                    background: "var(--bg-secondary)",
                  }}
                  title="Reporte PDF"
                />
              )}
            </div>
          </div>

          <div className="flex gap-2 flex-wrap">
            {selectedReport.pdf && (
              <a
                href={selectedReport.pdf}
                download
                className="btn-primary text-xs flex items-center gap-1"
              >
                📄 Descargar PDF
              </a>
            )}
            {selectedReport.excel && (
              <a
                href={selectedReport.excel}
                download
                className="btn-primary text-xs flex items-center gap-1"
                style={{ background: "var(--success)" }}
              >
                📊 Descargar Excel
              </a>
            )}
          </div>

          {selectedReport.summary && (
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
              {[
                { label: "Cambios", value: selectedReport.summary.total_changes, color: "var(--accent)" },
                { label: "Tendencias", value: selectedReport.summary.trends, color: "var(--warning)" },
                { label: "Anomalías", value: selectedReport.summary.anomalies, color: "var(--danger)" },
                { label: "Riesgos", value: selectedReport.summary.risks, color: "var(--danger)" },
                { label: "Oportunidades", value: selectedReport.summary.opportunities, color: "var(--success)" },
                { label: "Acciones", value: selectedReport.summary.next_actions, color: "var(--accent)" },
              ].map((m) => (
                <div
                  key={m.label}
                  className="p-2 rounded text-center"
                  style={{ background: "var(--bg-secondary)" }}
                >
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

      {!selectedReport && (
        <div className="p-8 text-center" style={{ color: "var(--text-muted)" }}>
          <p className="text-sm">No hay reportes generados aún.</p>
          <p className="text-xs mt-1">El bot genera reportes automáticamente a las 05:00 y 17:00.</p>
        </div>
      )}
    </div>
  );
}
