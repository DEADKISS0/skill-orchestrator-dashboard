"use client";
import { taskDefinitions } from "@/data/taskDefinitions";

const statusColors: Record<string, string> = {
  success: "var(--success)",
  failure: "var(--danger)",
  pending: "var(--warning)",
  unknown: "var(--text-muted)",
};

const statusLabels: Record<string, string> = {
  success: "Completado",
  failure: "Fallido",
  pending: "Pendiente",
  unknown: "Desconocido",
};

export default function TaskMonitorWidget() {
  return (
    <div className="card p-4 animate-in">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">⚙️</span>
        <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Tareas Programadas</h3>
      </div>

      <div className="space-y-2">
        {taskDefinitions.map(task => (
          <div key={task.id} className="flex items-center gap-3 p-2 rounded-lg" style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}>
            <div className="w-2 h-2 rounded-full" style={{ background: statusColors[task.status] }} />
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium truncate" style={{ color: "var(--text-primary)" }}>{task.name}</div>
              <div className="text-[10px] truncate" style={{ color: "var(--text-muted)" }}>{task.schedule}</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: `${statusColors[task.status]}20`, color: statusColors[task.status] }}>
                {statusLabels[task.status]}
              </div>
              {task.lastRun && (
                <div className="text-[9px] mt-0.5" style={{ color: "var(--text-muted)" }}>
                  {new Date(task.lastRun).toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" })}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
