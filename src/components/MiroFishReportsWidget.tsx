"use client";
import { useState, useEffect, useCallback } from "react";
import WidgetCard from "@/components/ui/WidgetCard";
import ReportSelector from "@/components/ui/ReportSelector";
import RegenerarReportButton from "@/components/ui/RegenerarReportButton";

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

/** Cotizador / panel denso de predicciones — KPIs primero, preview compacto. */
export default function MiroFishReportsWidget() {
  const [reports, setReports] = useState<ReportEntry[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<string>("");
  const [refreshKey, setRefreshKey] = useState(0);
  const [showPreview, setShowPreview] = useState(false);

  const selectedReport = reports[selectedIndex] ?? null;

  const fetchReports = useCallback(() => {
    fetch("/reports/predicciones_index.json")
      .then((r) => r.json())
      .then((data) => {
        const list: ReportEntry[] = (data.reports || []).map((r: ReportEntry) => ({
          ...r,
          heuristic: r.label?.toLowerCase().includes("heuríst") || false,
        }));
        setReports(list);
        setSelectedIndex(0);
        setLastUpdate(new Date().toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" }));
      })
      .catch(() => setReports([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchReports();
    const interval = setInterval(fetchReports, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [refreshKey, fetchReports]);

  if (loading && reports.length === 0) {
    return (
      <WidgetCard title="Cotizador Predicciones" icon="📊">
        <div className="skeleton-ember h-8 w-40 mb-2" />
        <div className="grid grid-cols-3 gap-2 mb-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="skeleton-ember h-14 rounded" />
          ))}
        </div>
      </WidgetCard>
    );
  }

  const s = selectedReport?.summary;
  const archivedCount = Math.max(0, reports.length - 3);

  return (
    <WidgetCard
      title="Cotizador Predicciones"
      icon="📊"
      badge={archivedCount > 0 ? `${reports.length} rpt` : `${reports.length}`}
      badgeVariant="active"
      action={
        <div className="flex items-center gap-1">
          <RegenerarReportButton variant="predicciones" />
          <button
            onClick={() => setRefreshKey((k) => k + 1)}
            className="btn-ghost !py-1 !px-2"
            title="Actualizar"
            aria-label="Actualizar predicciones"
          >
            ↻
          </button>
        </div>
      }
    >
      <div className="flex items-center gap-2 mb-2 flex-wrap">
        {selectedReport?.heuristic ? (
          <span className="skill-badge heuristic">Heurístico</span>
        ) : selectedReport ? (
          <span className="skill-badge active">IA</span>
        ) : null}
        <span className="font-mono-label text-[10px]" style={{ color: "var(--text-muted)" }}>
          {selectedReport?.label || "Sin reporte"}
          {lastUpdate ? ` · ${lastUpdate}` : ""}
        </span>
      </div>

      <ReportSelector
        reports={reports}
        selectedDate={selectedReport?.date ?? null}
        onSelect={(i) => {
          setSelectedIndex(i);
          setShowPreview(false);
        }}
        maxRecent={3}
      />

      {selectedReport && s && (
        <div className="grid grid-cols-3 md:grid-cols-6 gap-1.5 mb-2">
          {[
            { label: "Cambios", value: s.total_changes, color: "var(--ember)" },
            { label: "Tend.", value: s.trends, color: "var(--warning)" },
            { label: "Anom.", value: s.anomalies, color: "var(--danger)" },
            { label: "Riesgos", value: s.risks, color: "var(--danger)" },
            { label: "Oport.", value: s.opportunities, color: "var(--success)" },
            { label: "Acciones", value: s.next_actions, color: "var(--ember)" },
          ].map((m) => (
            <div
              key={m.label}
              className="py-1.5 px-1 rounded text-center"
              style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-subtle)" }}
            >
              <div className="font-display text-base leading-none" style={{ color: m.color }}>
                {m.value ?? "—"}
              </div>
              <div className="text-[9px] mt-0.5 font-mono-label" style={{ color: "var(--text-muted)" }}>
                {m.label}
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedReport && (
        <div className="flex gap-2 flex-wrap items-center mb-2">
          {selectedReport.pdf && (
            <a href={selectedReport.pdf} download className="btn-primary !py-1 !px-2.5 text-[11px]">
              📄 PDF
            </a>
          )}
          {selectedReport.excel && (
            <a
              href={selectedReport.excel}
              download
              className="btn-primary !py-1 !px-2.5 text-[11px]"
              style={{ background: "var(--success)" }}
            >
              📊 Excel
            </a>
          )}
          {selectedReport.pdf && (
            <button
              type="button"
              className="btn-ghost !py-1 !px-2.5 text-[11px]"
              onClick={() => setShowPreview((v) => !v)}
            >
              {showPreview ? "Ocultar preview" : "Preview PDF"}
            </button>
          )}
        </div>
      )}

      {showPreview && selectedReport?.pdf && (
        <iframe
          src={selectedReport.pdf}
          className="w-full rounded-lg border"
          style={{
            borderColor: "var(--border)",
            background: "var(--bg-secondary)",
            height: 280,
            minHeight: 280,
          }}
          title="Preview predicciones"
        />
      )}

      {!selectedReport && (
        <div className="py-4 text-center" style={{ color: "var(--text-muted)" }}>
          <p className="text-xs mb-2">Sin reportes. Regenera con MiroFish-Lite.</p>
          <RegenerarReportButton variant="predicciones" />
        </div>
      )}
    </WidgetCard>
  );
}
