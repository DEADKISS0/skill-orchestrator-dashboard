"use client";

import { useEffect, useState } from "react";

interface Milestone {
  date: string;
  title: string;
  status: "completed" | "in_progress" | "pending" | string;
}

const MOCK_MILESTONES: Milestone[] = [
  { date: "2026-01-15", title: "Kickoff Q1 — alineación estratégica", status: "completed" },
  { date: "2026-04-30", title: "Mega Dashboard v1", status: "completed" },
  { date: "2026-07-31", title: "Deadline Wuunder", status: "in_progress" },
  { date: "2026-09-30", title: "Meta Q3: 3 clientes", status: "pending" },
];

const STATUS_STYLE: Record<string, { label: string; color: string }> = {
  completed: { label: "Hecho", color: "var(--success)" },
  in_progress: { label: "En curso", color: "var(--ember)" },
  pending: { label: "Pendiente", color: "var(--text-muted)" },
};

function formatDate(iso: string): string {
  const d = new Date(iso + "T12:00:00");
  return d.toLocaleDateString("es-CO", { day: "numeric", month: "short" });
}

export default function CronogramaWidget() {
  const [milestones, setMilestones] = useState<Milestone[]>(MOCK_MILESTONES);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/data/cronograma_2026.json")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => {
        const items = Array.isArray(data) ? data : data.milestones;
        if (Array.isArray(items) && items.length > 0) {
          setMilestones(items);
        }
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  const completed = milestones.filter((m) => m.status === "completed").length;

  return (
    <div className="card p-4 animate-in">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">📅</span>
        <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
          Cronograma Consistente
        </h3>
        <span className="skill-badge active">cronograma-consistente</span>
        <span className="ml-auto text-[10px] font-mono-label" style={{ color: "var(--text-muted)" }}>
          {completed}/{milestones.length} · 2026
        </span>
      </div>

      <div className="space-y-2">
        {milestones.map((m, i) => {
          const st = STATUS_STYLE[m.status] ?? STATUS_STYLE.pending;
          return (
            <div
              key={`${m.date}-${i}`}
              className="flex items-start gap-3 p-2 rounded-lg"
              style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}
            >
              <div
                className="text-[10px] font-mono-label shrink-0 w-14 pt-0.5"
                style={{ color: "var(--ember-light)" }}
              >
                {formatDate(m.date)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[11px] truncate" style={{ color: "var(--text-primary)" }}>
                  {m.title}
                </div>
              </div>
              <span
                className="text-[9px] px-1.5 py-0.5 rounded font-mono-label shrink-0"
                style={{ color: st.color, background: "var(--bg-elevated)" }}
              >
                {st.label}
              </span>
            </div>
          );
        })}
      </div>

      {!loaded && (
        <p className="text-[10px] mt-2 text-center" style={{ color: "var(--text-muted)" }}>
          Cargando cronograma…
        </p>
      )}
    </div>
  );
}
