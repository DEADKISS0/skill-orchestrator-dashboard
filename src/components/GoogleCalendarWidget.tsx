"use client";
import { useState, useEffect, useCallback } from "react";

interface CalendarEvent {
  id: string;
  time?: string;
  day?: string;
  title: string;
  type: string;
  color: string;
}

interface CalendarData {
  configured?: boolean;
  message?: string;
  today: CalendarEvent[];
  tomorrow: CalendarEvent[];
  thisWeek: CalendarEvent[];
}

export default function GoogleCalendarWidget() {
  const [data, setData] = useState<CalendarData | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<string>("");
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchData = useCallback(async () => {
    try {
      const resp = await fetch("/api/calendar");
      const result = await resp.json();
      setData(result);
      setLastUpdate(new Date().toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" }));
    } catch (e) {
      console.error("Error fetching calendar:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [refreshKey]);

  if (loading) {
    return (
      <div className="card p-4 animate-in">
        <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Cargando calendario...</h3>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="card p-4 animate-in">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">📅</span>
        <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Google Calendar</h3>
        <span className="skill-badge support">Próximos</span>
        <button
          onClick={() => setRefreshKey(k => k + 1)}
          className="ml-auto text-xs px-2 py-1 rounded transition-colors hover:bg-white/10"
          style={{ color: "var(--text-muted)", background: "var(--bg-secondary)" }}
          title="Actualizar"
        >
          ↻
        </button>
      </div>

      {/* Warning if simulated */}
      {!data.configured && (
        <div className="mb-3 p-2 rounded text-[11px]" style={{ background: "rgba(245,158,11,0.1)", color: "var(--warning)", border: "1px solid rgba(245,158,11,0.3)" }}>
          ⚠️ Datos simulados. Configura GOOGLE_CALENDAR_CLIENT_ID y GOOGLE_CALENDAR_CLIENT_SECRET en .env.local para datos reales.
        </div>
      )}

      {/* Today */}
      <div className="mb-3">
        <div className="text-[10px] font-semibold mb-2" style={{ color: "var(--text-primary)" }}>HOY</div>
        {data.today.length === 0 ? (
          <p className="text-[11px]" style={{ color: "var(--text-muted)" }}>Sin eventos hoy</p>
        ) : (
          <div className="space-y-1">
            {data.today.map(e => (
              <div key={e.id} className="flex items-center gap-2 text-[11px]">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: e.color }} />
                <span className="text-[10px] w-10" style={{ color: "var(--text-muted)" }}>{e.time}</span>
                <span style={{ color: "var(--text-primary)" }}>{e.title}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Tomorrow */}
      <div className="mb-3">
        <div className="text-[10px] font-semibold mb-2" style={{ color: "var(--text-primary)" }}>MAÑANA</div>
        {data.tomorrow.length === 0 ? (
          <p className="text-[11px]" style={{ color: "var(--text-muted)" }}>Sin eventos mañana</p>
        ) : (
          <div className="space-y-1">
            {data.tomorrow.map(e => (
              <div key={e.id} className="flex items-center gap-2 text-[11px]">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: e.color }} />
                <span className="text-[10px] w-10" style={{ color: "var(--text-muted)" }}>{e.time}</span>
                <span style={{ color: "var(--text-primary)" }}>{e.title}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* This week */}
      <div>
        <div className="text-[10px] font-semibold mb-2" style={{ color: "var(--text-primary)" }}>ESTA SEMANA</div>
        {data.thisWeek.length === 0 ? (
          <p className="text-[11px]" style={{ color: "var(--text-muted)" }}>Sin eventos esta semana</p>
        ) : (
          <div className="space-y-1">
            {data.thisWeek.map(e => (
              <div key={e.id} className="flex items-center gap-2 text-[11px]">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: e.color }} />
                <span className="text-[10px] w-16" style={{ color: "var(--text-muted)" }}>{e.day}</span>
                <span style={{ color: "var(--text-primary)" }}>{e.title}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {lastUpdate && (
        <div className="mt-2 text-[10px] text-right" style={{ color: "var(--text-muted)" }}>
          Última actualización: {lastUpdate}
        </div>
      )}
    </div>
  );
}
