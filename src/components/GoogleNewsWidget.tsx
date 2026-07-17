"use client";
import { useState } from "react";

export default function GoogleNewsWidget() {
  const [filter, setFilter] = useState("tecnología");
  const news = [
    { title: "IA generativa transforma el marketing digital en LATAM", source: "El Tiempo", time: "2h" },
    { title: "Startups colombianas recaudan $50M en 2026", source: "Portafolio", time: "4h" },
    { title: "Brutalismo digital: la tendencia que llega para quedarse", source: "Revista Arc", time: "6h" },
    { title: "Agentes de IA automatizan el 40% de tareas administrativas", source: "Semana", time: "8h" },
    { title: "Medellín se consolida como hub tech de LATAM", source: "La Opinión", time: "12h" },
  ];
  return (
    <div className="card p-4 animate-in">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">📰</span>
        <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Google News Monitor</h3>
        <span className="skill-badge demo">Demo</span>
      </div>
      <div className="banner-mock mb-3">Noticias de ejemplo. Conectar google-news-monitor para datos en vivo.</div>
      <div className="flex gap-2 mb-3">
        {["tecnología", "IA", "negocios"].map((f) => (
          <button key={f} className="text-xs px-3 py-1 rounded-full transition-colors"
            style={{
              background: filter===f ? "var(--accent)" : "var(--bg-secondary)",
              color: filter===f ? "white" : "var(--text-secondary)",
            }}
            onClick={() => setFilter(f)}>{f}</button>
        ))}
      </div>
      <div className="space-y-2">
        {news.map((n,i) => (
          <div key={i} className="flex items-start gap-2 p-2 rounded" style={{ background: "var(--bg-secondary)" }}>
            <div className="pulse-dot mt-1.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-xs font-medium" style={{ color: "var(--text-primary)" }}>{n.title}</p>
              <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>{n.source} · hace {n.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
