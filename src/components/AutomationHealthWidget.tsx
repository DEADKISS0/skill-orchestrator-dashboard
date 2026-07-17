"use client";
import { useState, useEffect, useCallback } from "react";
import WidgetCard, { WidgetCardHeader } from "@/components/ui/WidgetCard";

interface AutomationJob {
  id: string;
  name: string;
  status: "ok" | "warning" | "error" | "unknown";
  lastRun?: string;
  detail: string;
}

interface AutomationData {
  jobs: AutomationJob[];
  summary: { ok: number; warning: number; error: number; total: number };
}

const statusColors: Record<string, string> = {
  ok: "var(--success)",
  warning: "var(--warning)",
  error: "var(--danger)",
  unknown: "var(--text-muted)",
};

const statusLabels: Record<string, string> = {
  ok: "OK",
  warning: "Revisar",
  error: "Error",
  unknown: "—",
};

export default function AutomationHealthWidget() {
  const [data, setData] = useState<AutomationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchData = useCallback(async () => {
    try {
      const resp = await fetch("/api/automation");
      setData(await resp.json());
    } catch {
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [refreshKey, fetchData]);

  if (loading) {
    return (
      <WidgetCard title="Automatizaciones" icon="⚙️" badge="Ops">
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>Cargando estado...</p>
      </WidgetCard>
    );
  }

  if (!data) return null;

  return (
    <WidgetCard
      title="Salud de Automatizaciones"
      icon="⚙️"
      badge={`${data.summary.ok}/${data.summary.total} OK`}
      badgeVariant="support"
      action={
        <button
          onClick={() => setRefreshKey((k) => k + 1)}
          className="btn-ghost !py-1 !px-2"
          title="Actualizar"
        >
          ↻
        </button>
      }
    >
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[
          { label: "OK", value: String(data.summary.ok), color: "var(--success)" },
          { label: "Revisar", value: String(data.summary.warning), color: "var(--warning)" },
          { label: "Errores", value: String(data.summary.error), color: "var(--danger)" },
        ].map((s) => (
          <div
            key={s.label}
            className="p-2 rounded-lg text-center"
            style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-subtle)" }}
          >
            <div className="font-display text-lg" style={{ color: s.color }}>{s.value}</div>
            <div className="font-mono-label" style={{ color: "var(--text-muted)" }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        {data.jobs.map((job) => (
          <div
            key={job.id}
            className="flex items-start gap-3 p-2.5 rounded-lg"
            style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-subtle)" }}
          >
            <div
              className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
              style={{ background: statusColors[job.status] }}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-medium" style={{ color: "var(--text-primary)" }}>
                  {job.name}
                </span>
                <span className="skill-badge context">{statusLabels[job.status]}</span>
              </div>
              <p className="text-[10px] mt-0.5" style={{ color: "var(--text-muted)" }}>
                {job.detail}
              </p>
              {job.lastRun && (
                <p className="text-[10px] mt-0.5 font-mono-label" style={{ color: "var(--ash)" }}>
                  Última: {job.lastRun}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </WidgetCard>
  );
}
