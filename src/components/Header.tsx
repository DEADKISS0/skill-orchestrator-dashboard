"use client";
import { STATS } from "@/data/skillsCatalog";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-3 border-b"
      style={{ borderColor: "var(--border)", background: "var(--bg-secondary)" }}>
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
          style={{ background: "var(--accent)", color: "white" }}>RR</div>
        <div>
          <h1 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
            RR ALIADOS — MiroFish Dashboard
          </h1>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            Brutalismo Estratégico Colombiano
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="pulse-dot" />
          <span className="text-xs" style={{ color: "var(--success)" }}>
            {STATS.installed} instaladas
          </span>
        </div>
        <div className="text-xs px-2 py-1 rounded" style={{ background: "var(--bg-card)", color: "var(--text-muted)" }}>
          {STATS.total} total · {STATS.available} disponibles
        </div>
      </div>
    </header>
  );
}
