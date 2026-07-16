"use client";
import { STATS } from "@/data/skillsCatalog";
import ThemeToggle from "./ThemeToggle";
import GlobalSearch from "./GlobalSearch";
import NotificationCenter from "./NotificationCenter";

interface HeaderProps {
  onMenuToggle?: () => void;
}

export default function Header({ onMenuToggle }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-6 py-3 border-b"
      style={{ borderColor: "var(--border)", background: "var(--bg-secondary)" }}>
      <div className="flex items-center gap-3">
        {onMenuToggle && (
          <button onClick={onMenuToggle} className="md:hidden text-lg" style={{ color: "var(--text-muted)" }}>
            ☰
          </button>
        )}
        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
          style={{ background: "var(--accent)", color: "white" }}>RR</div>
        <div>
          <h1 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
            RR ALIADOS — Mega Dashboard
          </h1>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            Centro de Comando Centralizado
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <GlobalSearch />
        <NotificationCenter />
        <ThemeToggle />
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
