"use client";
import { useState, useEffect, useCallback } from "react";
import WidgetCard from "@/components/ui/WidgetCard";

interface GAData {
  configured?: boolean;
  message?: string;
  realTime: { activeUsers: number; pageViews: number; sessions: number };
  today: { users: number; pageViews: number; sessions: number; bounceRate: string; avgSessionDuration: number };
  topPages: { page: string; views: number; percentage: string }[];
  trafficSources: { source: string; percentage: string }[];
}

export default function GoogleAnalyticsWidget() {
  const [data, setData] = useState<GAData | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<string>("");
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchData = useCallback(async () => {
    try {
      const resp = await fetch("/api/analytics");
      const result = await resp.json();
      setData(result);
      setLastUpdate(new Date().toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" }));
    } catch (e) {
      console.error("Error fetching analytics:", e);
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
      <WidgetCard title="Google Analytics" icon="📊">
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>Cargando analytics...</p>
      </WidgetCard>
    );
  }

  if (!data) return null;

  return (
    <WidgetCard
      title="Google Analytics"
      icon="📊"
      badge="Tiempo Real"
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

      {/* Warning if simulated */}
      {!data.configured && (
        <div className="banner-mock mb-3 flex items-center justify-between gap-2">
          <span>⚠️ DEMO — Datos simulados. Conecta GA4 en .env.local</span>
          <span className="skill-badge demo">Mock</span>
        </div>
      )}

      {/* Real-time KPIs */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="p-2 rounded-lg text-center" style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}>
          <div className="text-lg font-bold" style={{ color: "var(--ember)" }}>{data.realTime.activeUsers}</div>
          <div className="text-[10px]" style={{ color: "var(--text-muted)" }}>Activos ahora</div>
        </div>
        <div className="p-2 rounded-lg text-center" style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}>
          <div className="text-lg font-bold" style={{ color: "var(--success)" }}>{data.realTime.pageViews}</div>
          <div className="text-[10px]" style={{ color: "var(--text-muted)" }}>Vistas hoy</div>
        </div>
        <div className="p-2 rounded-lg text-center" style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}>
          <div className="text-lg font-bold" style={{ color: "var(--warning)" }}>{data.realTime.sessions}</div>
          <div className="text-[10px]" style={{ color: "var(--text-muted)" }}>Sesiones</div>
        </div>
      </div>

      {/* Today's metrics */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="p-2 rounded-lg" style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}>
          <div className="text-[10px] font-semibold" style={{ color: "var(--text-primary)" }}>Hoy</div>
          <div className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>
            {data.today.users} usuarios · {data.today.pageViews} vistas
          </div>
        </div>
        <div className="p-2 rounded-lg" style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}>
          <div className="text-[10px] font-semibold" style={{ color: "var(--text-primary)" }}>Engagement</div>
          <div className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>
            Rebote: {data.today.bounceRate} · Duración: {Math.floor(data.today.avgSessionDuration / 60)}m
          </div>
        </div>
      </div>

      {/* Top pages */}
      <div className="mb-3">
        <div className="text-[10px] font-semibold mb-2" style={{ color: "var(--text-primary)" }}>Páginas Top</div>
        {data.topPages.slice(0, 3).map((p, i) => (
          <div key={i} className="flex items-center gap-2 text-[11px] mb-1">
            <span style={{ color: "var(--text-muted)" }}>{i + 1}.</span>
            <span className="flex-1" style={{ color: "var(--text-primary)" }}>{p.page}</span>
            <span style={{ color: "var(--text-muted)" }}>{p.percentage}</span>
          </div>
        ))}
      </div>

      {/* Traffic sources */}
      <div>
        <div className="text-[10px] font-semibold mb-2" style={{ color: "var(--text-primary)" }}>Fuentes</div>
        <div className="flex gap-2">
          {data.trafficSources.map((s, i) => (
            <div key={i} className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: "var(--border)", color: "var(--text-secondary)" }}>
              {s.source} {s.percentage}
            </div>
          ))}
        </div>
      </div>

      {lastUpdate && (
        <div className="mt-2 text-[10px] text-right" style={{ color: "var(--text-muted)" }}>
          Última actualización: {lastUpdate}
        </div>
      )}
    </WidgetCard>
  );
}
