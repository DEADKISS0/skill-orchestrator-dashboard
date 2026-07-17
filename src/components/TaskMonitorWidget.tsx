"use client";
import { useState, useEffect, useCallback } from "react";

interface LiveTask {
  id: string;
  name: string;
  schedule: string;
  status: "success" | "failure" | "pending" | "unknown";
  lastRun?: string;
}

const statusColors: Record<string, string> = {
  success: "var(--success)",
  failure: "var(--danger)",
  pending: "var(--warning)",
  unknown: "var(--text-muted)",
};

const statusLabels: Record<string, string> = {
  success: "OK",
  failure: "Error",
  pending: "Revisar",
  unknown: "—",
};

const SCHEDULES: Record<string, string> = {
  "mirofish-daily": "Diario 05:00 / 17:00",
  strategic: "Diario 05:00 / 17:00",
  optimization: "Diario 05:00 / 17:00",
  "reports-sync": "Tras generar reportes",
  "skills-sync": "Antes de deploy",
  "vercel-deploy": "Tras sync",
};

function mapStatus(s: string): LiveTask["status"] {
  if (s === "ok") return "success";
  if (s === "error") return "failure";
  if (s === "warning") return "pending";
  return "unknown";
}

export default function TaskMonitorWidget() {
  const [tasks, setTasks] = useState<LiveTask[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const resp = await fetch("/api/automation");
      const data = await resp.json();
      const jobs = (data.jobs ?? []) as Array<{
        id: string;
        name: string;
        status: string;
        lastRun?: string;
      }>;
      setTasks(
        jobs.map((j) => ({
          id: j.id,
          name: j.name,
          schedule: SCHEDULES[j.id] ?? "Ver /api/automation",
          status: mapStatus(j.status),
          lastRun: j.lastRun,
        }))
      );
    } catch {
      setTasks([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div className="card p-4 animate-in">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">⚙️</span>
        <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
          Tareas Programadas
        </h3>
      </div>

      {loading ? (
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
          Cargando desde /api/automation…
        </p>
      ) : (
        <div className="space-y-2">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center gap-3 p-2 rounded-lg"
              style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}
            >
              <div className="w-2 h-2 rounded-full" style={{ background: statusColors[task.status] }} />
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium truncate" style={{ color: "var(--text-primary)" }}>
                  {task.name}
                </div>
                <div className="text-[10px] truncate" style={{ color: "var(--text-muted)" }}>
                  {task.schedule}
                </div>
              </div>
              <div className="text-right">
                <div
                  className="text-[10px] px-1.5 py-0.5 rounded"
                  style={{
                    background: `${statusColors[task.status]}20`,
                    color: statusColors[task.status],
                  }}
                >
                  {statusLabels[task.status]}
                </div>
                {task.lastRun && (
                  <div className="text-[9px] mt-0.5" style={{ color: "var(--text-muted)" }}>
                    {task.lastRun}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
